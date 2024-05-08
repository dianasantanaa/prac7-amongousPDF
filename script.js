document.getElementById('download-pdf-btn').addEventListener('click', function() {
    const downloadBtn = document.getElementById('download-pdf-btn');
    downloadBtn.style.visibility = 'hidden'; // Oculta el botón sin afectar el layout

    html2canvas(document.body, {
        onclone: (documentClone) => {
            // Me tengo que asegurar de que el botón esté oculto en el clon también
            documentClone.getElementById('download-pdf-btn').style.visibility = 'hidden';
        }
    }).then(canvas => {
        // Vuelve a mostrar el botón una vez que se genera el PDF!
        downloadBtn.style.visibility = '';

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Ajusta la imagen al tamaño de la página del PDF
        const imgWidth = 297; // Ancho de A4 en mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const yPosition = (210 - imgHeight) / 2; // Centrar verticalmente en una página A4

        // Añadir la imagen al PDF
        pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);

        // Guardar el PDF
        pdf.save('Amongouspru.pdf');
    });
});