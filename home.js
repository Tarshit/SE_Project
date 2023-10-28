document.addEventListener("DOMContentLoaded", function () {
    const dragAndDropArea = document.getElementById("drag-and-drop-area");
    const fileInput = document.querySelector('input[type="file"]');

    fileInput.addEventListener("change", function () {
        const form = document.querySelector('form');
        const formData = new FormData(form);
        fetch("/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Handle the response, e.g., display a message
        });
    });

    // Add a drag-and-drop event listener to the drag-and-drop area
    dragAndDropArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        dragAndDropArea.classList.add("drag-over");
    });

    dragAndDropArea.addEventListener("dragleave", function () {
        dragAndDropArea.classList.remove("drag-over");
    });

    dragAndDropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        dragAndDropArea.classList.remove("drag-over");
        handleFileUpload(e.dataTransfer.files[0]);
    });

    // Add an event listener for the file input
    fileInput.addEventListener("change", function (e) {
        handleFileUpload(e.target.files[0]);
    });

    function handleFileUpload(file) {
        if (file) {
            if (file.type === "text/csv" || file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                const reader = new FileReader();

                reader.onload = function (event) {
                    const dataURI = event.target.result;
                    displayFileContent(dataURI, file.type);
                };

                reader.readAsDataURL(file);
            } else {
                alert("Unsupported file format. Please upload a CSV or Excel file.");
            }
        }
    }

    function displayFileContent(dataURI, fileType) {
        if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            // Parse XLSX file
            const xlsxData = new Uint8Array(dataURI.split(",")[1]);
            const workbook = XLSX.read(xlsxData, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const csvContent = XLSX.utils.sheet_to_csv(sheet, { raw: true });
            displayContent(csvContent);
        } else {
            // Display CSV content
            window.location.href = `content.html?data=${encodeURIComponent(dataURI)}`;
        }
    }
});

function displayContent(content) {
    // Redirect to the content page with the file data as a URL parameter
    window.location.href = `content.html?data=${encodeURIComponent(content)}`;
}
