// // MDB Lightbox Init
// $(function () {
//     $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
// });

function openModal() {
    document.getElementById("mySlides").style.display = "block";
}

function closeModal() {
    document.getElementById("mySlides").style.display = "none";
}

// let slideIndex = 1;
// showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     let dots = document.getElementsByClassName("demo");
//     let captionText = document.getElementById("caption");
//     if (n > slides.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = slides.length}
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//         dots[i].mySlides= dots[i].mySlides.replace(" active", "");
//     }
//     slides[slideIndex-1].style.display = "block";
//     dots[slideIndex-1].mySlides += " active";
//     captionText.innerHTML = dots[slideIndex-1].alt;
// }


