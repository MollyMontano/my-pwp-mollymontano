$(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
}


$(document).ready(function () {
    $("#contact").validate({
    debug: true,
        errorClass: "alert alert-danger",
        errorLabelContainer: '#output-area',
        errorElement: "div",


    rules: {
        name: {
            required: true,
        },
        email: {
            email: true,
                required: true,
        },
        message: {
            required: true,
                maxlength: 2000
        }
    },
    messages: {
        name:{
            required: "Name is a required field",
        },
        email:{
            required: "is a required field",
                email: "please provide a valid email"
        },
        message:{
            required: "Message is a required field",
                maxlength: "message is too long"
        }
    },
    submitHandler: (form) => {
     $("#contact").ajaxSubmit({
         type: "POST",
         url: $("contact").attr('action'),
         success: () => {
             $("#output-area").css("display","")
            $("#output-area").html(ajaxOutput)

            if($(".alert-success").length >= 1) {
                $("#contact")[0].reset()
            }
            }
        })
     }
})
})