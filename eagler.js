function openLink(link, target) {
    const win = window.open(link, "_blank"); // Use about:blank for the initial window

    if (win) {
        win.document.open();
        win.document.write(`
            <style>
                body { margin: 0; padding: 0; overflow: hidden; background: #000; }
                iframe { width: 100vw; height: 100vh; border: none; }
            </style>
            <!-- Added id="gameFrame" and onload handler -->
            <iframe id="gameFrame" src="${target}" onload="this.focus()"></iframe>
            <script>
                // This ensures that clicking anywhere in the window focuses the iframe
                window.addEventListener('click', () => {
                    document.getElementById('gameFrame').focus();
                });
            </script>
        `);
        win.document.close();
    }
}
document.getElementById("astra").addEventListener('click', function() {
    openLink('about:blank', 'https://byebyeshane.netlify.app/eagler-files/1.8/astraclient')
});
document.getElementById("main").addEventListener('click', function() {
    openLink('about:blank', 'https://byebyeshane.netlify.app/eagler-files/1.8/main/');
});
