const vscode = require('vscode')
let content
function activate(context) {
    console.log(' "weibo" is now active!')

    let statusBarItemMain = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 6)
    statusBarItemMain.text = '$(flame)'
    statusBarItemMain.tooltip = '发一条微博'
    statusBarItemMain.command = 'weibo.post'
    statusBarItemMain.show()

    let disposable = vscode.commands.registerCommand('weibo.post', function () {
        const editor = vscode.window.activeTextEditor
        if(!editor) {
            vscode.window.showInformationMessage('没有有效窗口')
            return
        }
        const document = vscode.window.activeTextEditor.document
        const lineCount = document.lineCount
        let content = ""
        if(lineCount > 0) {
            for(let i=0 ; i < lineCount; i++) {
                content += encodeURI(document.lineAt(i).text) + "%0A"
            }
        }
        const url = `https://m.weibo.cn/compose?content=${(content)}`
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url))
    })
    
    context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {
}
exports.deactivate = deactivate