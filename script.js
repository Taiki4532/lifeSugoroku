import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

function updateSVG() {
    const textInput = document.getElementById("textInput").value;
    const svgText = document.getElementById("svgText");
    svgText.textContent = textInput;
}

function exportPDF() {
    const svgElement = document.getElementById("svgCanvas");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
        canvas.width = svgElement.clientWidth;
        canvas.height = svgElement.clientHeight;
        ctx.drawImage(img, 0, 0);

        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 10, 10, canvas.width / 5, canvas.height / 5);
        pdf.save("output.pdf");
        URL.revokeObjectURL(url);
    };

    img.src = url;
}
