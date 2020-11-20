
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

function openModal() {
    document.getElementById("mySlides").style.display = "block";
}

function closeModal() {
    document.getElementById("mySlides").style.display = "none";
}

