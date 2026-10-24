import { decodeProfile, decodeImageData, normalizeEAN, checkDigitOK } from '../barcode.js';

const L = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
const G = ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
const R = ['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'];

const parity = 'LGGLLG';
let ean13 = '101';
for (let i = 0; i < 6; i++) ean13 += (parity[i] === 'L' ? L : G)[Number('901234'[i])];
ean13 += '01010';
for (const digit of '123457') ean13 += R[Number(digit)];
ean13 += '101';
if (ean13.length !== 95) throw new Error('EAN-13 fixture must have 95 modules');
const profile13 = Float32Array.from(ean13.split('').flatMap((bit) => Array(5).fill(bit === '1' ? 18 : 244)));
if (decodeProfile(profile13)?.code !== '5901234123457') throw new Error('EAN-13 profile decoder failed the valid checksum fixture');
if (normalizeEAN('901234123457') !== '0901234123457') throw new Error('UPC-A normalization failed');
if (!checkDigitOK('5901234123457')) throw new Error('Valid EAN-13 checksum was rejected');

let invalidEAN13 = '101';
for (let i = 0; i < 6; i++) invalidEAN13 += (parity[i] === 'L' ? L : G)[Number('901234'[i])];
invalidEAN13 += '01010';
for (const digit of '123456') invalidEAN13 += R[Number(digit)];
invalidEAN13 += '101';
if (invalidEAN13.length !== 95 || decodeProfile(Float32Array.from(invalidEAN13.split('').flatMap((bit) => Array(5).fill(bit === '1' ? 18 : 244)))) !== null) {
  throw new Error('EAN-13 decoder accepted an invalid checksum');
}

const ean8 = '101' + L[9] + L[6] + L[3] + L[8] + '01010' + R[5] + R[0] + R[7] + R[4] + '101';
if (ean8.length !== 67) throw new Error('EAN-8 fixture must have 67 modules');
if (decodeProfile(Float32Array.from(ean8.split('').flatMap((bit) => Array(5).fill(bit === '1' ? 18 : 244))))?.code !== '96385074') throw new Error('EAN-8 decoder failed the valid checksum fixture');

function makeCameraFrame(bits, {
  angle = 0,
  centerX = 0.5,
  centerY = 0.5,
  moduleWidth = 6,
  barHeight = 170,
  dark = 18,
  light = 244,
} = {}) {
  const FRAME_WIDTH = 960;
  const FRAME_HEIGHT = 720;
  const codeWidth = bits.length * moduleWidth;
  const radians = angle * Math.PI / 180;
  const cos = Math.cos(radians), sin = Math.sin(radians);
  const cx = FRAME_WIDTH * centerX, cy = FRAME_HEIGHT * centerY;
  const extentX = (Math.abs(cos) * codeWidth + Math.abs(sin) * barHeight) / 2 + 2;
  const extentY = (Math.abs(sin) * codeWidth + Math.abs(cos) * barHeight) / 2 + 2;
  let imageReads = 0;

  const fakeContext = {
    drawImage() {},
    getImageData(_x, _y, width, height) {
      imageReads++;
      const data = new Uint8ClampedArray(width * height * 4);
      for (let p = 0; p < data.length; p += 4) {
        data[p] = light; data[p + 1] = light; data[p + 2] = light; data[p + 3] = 255;
      }

      const xMin = Math.max(0, Math.floor(cx - extentX));
      const xMax = Math.min(width - 1, Math.ceil(cx + extentX));
      const yMin = Math.max(0, Math.floor(cy - extentY));
      const yMax = Math.min(height - 1, Math.ceil(cy + extentY));
      for (let y = yMin; y <= yMax; y++) {
        for (let x = xMin; x <= xMax; x++) {
          const dx = x - cx, dy = y - cy;
          // Inverse rotation: barcode bars stay parallel to the local Y axis.
          const localX = cos * dx + sin * dy + codeWidth / 2;
          const localY = -sin * dx + cos * dy + barHeight / 2;
          if (localX < 0 || localX >= codeWidth || localY < 0 || localY >= barHeight) continue;
          const module = Math.floor(localX / moduleWidth);
          if (bits[module] !== '1') continue;
          const p = (y * width + x) * 4;
          data[p] = dark; data[p + 1] = dark; data[p + 2] = dark; data[p + 3] = 255;
        }
      }
      return { data, width, height };
    },
  };
  const canvas = { width: FRAME_WIDTH, height: FRAME_HEIGHT, getContext: () => fakeContext };
  const video = { readyState: 2, videoWidth: FRAME_WIDTH, videoHeight: FRAME_HEIGHT };
  return {
    video,
    canvas,
    decode: () => decodeImageData(fakeContext.getImageData(0, 0, FRAME_WIDTH, FRAME_HEIGHT)),
    imageReads: () => imageReads,
    dimensions: () => [canvas.width, canvas.height],
  };
}

const cases = [
  { label: 'normal EAN-13', bits: ean13, expected: '5901234123457', angle: 0 },
  { label: 'rotated 30 degrees', bits: ean13, expected: '5901234123457', angle: 30 },
  { label: 'upside down 180 degrees', bits: ean13, expected: '5901234123457', angle: 180 },
  { label: 'tilted and off-centre', bits: ean13, expected: '5901234123457', angle: -15, centerX: 0.65, centerY: 0.57 },
  { label: 'diagonal EAN-13', bits: ean13, expected: '5901234123457', angle: 32 },
  { label: 'small EAN-8', bits: ean8, expected: '96385074', angle: 30, moduleWidth: 5.5, barHeight: 160 },
];

for (const test of cases) {
  const frame = makeCameraFrame(test.bits, test);
  const result = frame.decode();
  if (result?.code !== test.expected) throw new Error(test.label + ': expected ' + test.expected + ', got ' + JSON.stringify(result));
  if (frame.dimensions()[0] !== 960 || frame.dimensions()[1] !== 720) {
    throw new Error(test.label + ': incorrect camera-frame dimensions: ' + frame.dimensions().join('x'));
  }
  if (frame.imageReads() !== 1) throw new Error(test.label + ': frame should be read from Canvas once per scan');
}

console.log('PASS: EAN checksum/profile and camera-frame decoding at 0°, 90°, 180°, diagonal, off-centre and EAN-8');
