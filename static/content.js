document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get("data");

    if (content) {
        if (content.startsWith("data:text/csv")) {
            const contentDisplay = document.getElementById("file-content");
            contentDisplay.innerText = content;
        } else {
            const workbook = XLSX.read(binaryContent, { type: 'binary' });
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
