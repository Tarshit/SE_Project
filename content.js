document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get("data");

    if (content) {
        if (content.startsWith("data:text/csv")) {
            // Handle CSV file
            const csvContent = atob(content.split(',')[1]);
            displayContent(csvContent);
        } else {
            // Try to handle Excel files
            try {
                const binaryContent = atob(content.split(',')[1]);
                const workbook = XLSX.read(binaryContent, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[firstSheetName];
                const csvContent = XLSX.utils.sheet_to_csv(sheet);
                displayContent(csvContent);
            } catch (error) {
                displayContent("Unsupported file format for Excel files.");
            }
        }
    }
});

function displayContent(content) {
    const contentDisplay = document.getElementById("file-content");
    contentDisplay.innerText = content;
}
