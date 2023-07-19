document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.font = '16px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
  
    context.fillStyle = 'red';
    context.fillText('A', 8, 17);
  
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.addEventListener('click', function () {
      const canvasData = canvas.toDataURL('image/png');
      const pixelData = getCanvasRegionPixelData(canvas, 0, 0, 16, 34);
      const hexData = convertPixelDataToHex(pixelData);
      downloadFile(hexData, 'canvas_pixel_data.txt');
    });
  
    function getCanvasRegionPixelData(canvas, x, y, width, height) { 
      const context = canvas.getContext('2d');
      const imageData = context.getImageData(x, y, width, height);
      return imageData.data;
    }
  
    function convertPixelDataToHex(pixelData) {
    let hexData = '';
    for (let i = 0; i < pixelData.length; i += 4) {
      const red = pixelData[i].toString(16).padStart(2, '0');
      const green = pixelData[i + 1].toString(16).padStart(2, '0');
      const blue = pixelData[i + 2].toString(16).padStart(2, '0');
      const alpha = pixelData[i + 3].toString(16).padStart(2, '0');
      const hexColor = '0x' + red + green + blue + alpha;
      hexData += hexColor + ', ';
      if ((i + 4) % 64 === 0) {
        hexData += '\n';
      }
    }
    return hexData;
  }
  
  
    function downloadFile(data, filename) {
      const blob = new Blob([data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
  
      URL.revokeObjectURL(url);
    }
  });
  
