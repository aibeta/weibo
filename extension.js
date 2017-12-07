const vscode = require('vscode')
let content
function activate(context) {
    console.log(' "weibo" is now active!')

    let statusBarItemMain = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 6)
    statusBarItemMain.text = 'Weibo'
    statusBarItemMain.tooltip = '发一条微博'
    statusBarItemMain.command = 'post'
    statusBarItemMain.show()

    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        vscode.window.showTextDocument({
            value: 'value',
            prompt: 'prompt'
        })
    })

    let disposable1 = vscode.commands.registerCommand('post', function () {
        let url = `https://m.weibo.cn/compose?content=${(this.content)}`
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url))
    })

    vscode.window.onDidChangeTextEditorSelection(function(e) {
        const document = e.textEditor.document
        const lineCount = document.lineCount
        let content = ""
        if(lineCount > 0) {
            for(let i=0 ; i < lineCount; i++) {
                content += encodeURI(document.lineAt(i).text) + "%0A"
            }
        }
        this.content = content
    })
    
    context.subscriptions.push(disposable)
    context.subscriptions.push(disposable1)
}
exports.activate = activate

function deactivate() {
}
exports.deactivate = deactivate