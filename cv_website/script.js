/*
 * Behaviour for the CV page.
 *
 * This script provides two main features:
 *  1. Allowing the user to change their avatar by selecting a new
 *     image.  The file input is invisible and covers the avatar area so
 *     the user can click directly on the picture.  When a new
 *     picture is chosen, a FileReader converts it to a data URI and
 *     updates the `<img>` element.
 *  2. Triggering the browser's print functionality to allow the
 *     document to be saved as a PDF.  Using `window.print()` ensures
 *     that page breaks defined in CSS are honoured.  When printing,
 *     the toolbar and file input are hidden via CSS.
 */

document.addEventListener('DOMContentLoaded', () => {
  const avatarInput = document.getElementById('avatarInput');
  const avatarImg = document.getElementById('avatar');
  const downloadBtn = document.getElementById('downloadPDF');

  // Grab all the print option checkboxes
  const printOptions = document.querySelectorAll('#printOptions input[type="checkbox"]');

  /**
   * Iterate over each checkbox and apply or remove the 'print-hide'
   * class to the corresponding sections.  Sections are identified
   * by the class name stored in the checkbox's data-section attribute.
   */
  function updatePrintVisibility() {
    printOptions.forEach(cb => {
      const sectionClass = cb.dataset.section;
      const sections = document.querySelectorAll('.' + sectionClass);
      sections.forEach(section => {
        if (cb.checked) {
          section.classList.remove('print-hide');
        } else {
          section.classList.add('print-hide');
        }
      });
    });
  }

  // Initialize visibility based on default checkbox state
  updatePrintVisibility();

  // Update visibility whenever the user toggles a checkbox
  printOptions.forEach(cb => {
    cb.addEventListener('change', updatePrintVisibility);
  });

  // Update the avatar image when the user selects a new file
  avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Trigger print when the download button is clicked
  downloadBtn.addEventListener('click', () => {
    // Some browsers (e.g. Chrome) will insert a small delay before
    // updating images drawn from data URLs.  Wrapping window.print()
    // inside a setTimeout allows those updates to finish first.
    setTimeout(() => {
      window.print();
    }, 100);
  });
});