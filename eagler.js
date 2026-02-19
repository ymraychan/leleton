document.getElementById("astra").addEventListener('click', function() {
    const win = window.open("about:blank", "_blank");

    if (win) {
        win.document.write(`
            <style>
                body { margin: 0; padding: 0; overflow: hidden; background: #000; }
                iframe { width: 100vw; height: 100vh; border: none; }
            </style>
            <iframe src="https://byebyeshane.netlify.app/eagler-files/1.8/astraclient/"></iframe>
        `);
        win.document.close();
    }
});
document.getElementById("main").addEventListener('click', function() {
    const win = window.open("about:blank", "_blank");

    if (win) {
        win.document.write(`
            <style>
                body { margin: 0; padding: 0; overflow: hidden; background: #000; }
                iframe { width: 100vw; height: 100vh; border: none; }
            </style>
            <iframe src="https://byebyeshane.netlify.app/eagler-files/1.8/main/"></iframe>
        `);
        win.document.close();
    }
});
