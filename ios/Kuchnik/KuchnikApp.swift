import SwiftUI
import WebKit

@main
struct KuchnikApp: App {
    var body: some Scene {
        WindowGroup { ContentView() }
    }
}

struct ContentView: View {
    var body: some View {
        LocalAppWebView()
            .ignoresSafeArea()
            .preferredColorScheme(.dark)
    }
}

struct LocalAppWebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        let web = WKWebView(frame: .zero, configuration: config)
        web.isOpaque = false
        web.backgroundColor = UIColor(red: 23/255, green: 23/255, blue: 25/255, alpha: 1)
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.scrollView.keyboardDismissMode = .interactive
        if let root = Bundle.main.resourceURL?.appendingPathComponent("www", isDirectory: true),
           let index = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "www") {
            web.loadFileURL(index, allowingReadAccessTo: root)
        } else {
            web.loadHTMLString("<html><body style='background:#171719;color:white;font:17px system-ui;padding:24px'>Nie znaleziono lokalnych plików aplikacji.</body></html>", baseURL: nil)
        }
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}