import SwiftUI
import WebKit

@main
struct KuchnikApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.dark)
        }
    }
}

struct ContentView: View {
    var body: some View {
        KuchnikWebView()
            .ignoresSafeArea()
            .background(Color(red: 23/255, green: 23/255, blue: 25/255))
    }
}

struct KuchnikWebView: UIViewRepresentable {
    private let appURL = URL(string: "https://cerixu.github.io/Kuchnik/")!

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = false

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 23/255, green: 23/255, blue: 25/255, alpha: 1)
        webView.scrollView.backgroundColor = webView.backgroundColor
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.allowsBackForwardNavigationGestures = false
        webView.customUserAgent = nil
        webView.navigationDelegate = context.coordinator
        webView.load(URLRequest(url: appURL, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 25))
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    final class Coordinator: NSObject, WKNavigationDelegate {
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            // WKWebView retains its website data store; retrying allows the PWA service worker/cache to recover.
            let alert = UIAlertController(
                title: "Nie można połączyć z Kuchnikiem",
                message: "Sprawdź internet i spróbuj ponownie. Jeśli aplikacja była już uruchomiona, jej zapisany cache może nadal zawierać część danych.",
                preferredStyle: .alert
            )
            alert.addAction(UIAlertAction(title: "Spróbuj ponownie", style: .default) { _ in
                webView.reload()
            })
            alert.addAction(UIAlertAction(title: "OK", style: .cancel))
            webView.window?.rootViewController?.present(alert, animated: true)
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = navigationAction.request.url else {
                decisionHandler(.cancel)
                return
            }
            if url.scheme == "https" && (url.host == "cerixu.github.io" || url.host == "github.com") {
                decisionHandler(.allow)
            } else if navigationAction.navigationType == .linkActivated {
                decisionHandler(.cancel)
                UIApplication.shared.open(url)
            } else {
                decisionHandler(.allow)
            }
        }
    }
}
