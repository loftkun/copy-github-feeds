var browser = browser || chrome

browser.contextMenus.create({
  id: 'copy GitHub feeds',
  title: 'copy GitHub feeds',
  contexts: ['page'],
  onclick: (info, tab) => {
    var url = tab.url
    if (!url.includes("https://github.com/")) {
      return
    }
    var results = url.match("https://github.com/([^/]*)/([^/]*)")
    if (!results) {
      return
    }
    var org_repo = results[1] + "/" + results[2]
    // relsease
    //  https://github.com/kubernetes/kubernetes/releases.atom
    var release = "https://github.com/" + org_repo + "/releases.atom"
    // branch (master)
    var branch_master = "https://github.com/" + org_repo + "/commits/master.atom"
    // issue (open)
    //  https://rsshub.app/github/issue/kubernetes/minikube/open
    var issue_open = "https://rsshub.app/github/issue/" + org_repo + "/open"
    // issue (tag)
    //  https://rsshub.app/github/issue/kubernetes/minikube/open/good%20first%20issue
    var issue_open_tag = "https://rsshub.app/github/issue/" + org_repo + "/open/good%20first%20issue"

    toClipBoard(
      release + "\n" +
      branch_master + "\n" +
      issue_open + "\n" +
      issue_open_tag
    )

    function toClipBoard(text) {
      var ta = document.createElement("textarea")
      ta.value = text
      ta.style.position = "fixed"
      ta.style.left = "0"
      ta.style.top = "0"
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      ta.parentElement.removeChild(ta)
    }
  }
})
