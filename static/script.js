function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            window.location.href = `content.html?data=${encodeURIComponent({{ url_for('content')}})}`;
        };

        reader.readAsDataURL(file);
    }
}

function allowDrop(event) {
    event.preventDefault();
    const dragAndDropArea = document.getElementById("drag-and-drop-area");
    dragAndDropArea.classList.add("drag-over");
}

function handleDrop(event) {
    event.preventDefault();
    const dragAndDropArea = document.getElementById("drag-and-drop-area");
    dragAndDropArea.classList.remove("drag-over");

    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get("data");

    if (content) {
        displayContent(content);
    }
});

function displayContent(content) {
    const contentDisplay = document.getElementById("file-info");
    contentDisplay.innerText = content;
}
