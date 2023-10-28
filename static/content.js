document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get("data");

    if (content) {
        if (content.startsWith("data:text/csv")) {
            // Bug 1: Incorrect variable name
            // Attempt to access an element with the incorrect ID
            const contentDisplay = document.getElementById("file-content");  // Introducing a bug
            contentDisplay.innerText = content;
        } else {
            // Bug 2: Using an undefined variable
            // Attempt to use an undefined 'XLSX' variable to read Excel files
            const workbook = XLSX.read(binaryContent, { type: 'binary' });  // Introducing a bug
            const firstSheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[firstSheetName];
            const csvContent = XLSX.utils.sheet_to_csv(sheet);
            displayContent(csvContent);
        }
    }
});

function displayContent(content) {
    const contentDisplay = document.getElementById("file-content");
    contentDisplay.innerText = content;
}
