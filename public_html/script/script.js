$(document).ready(function () {
    $("contact").validate()
    debug: true,
        errorClass: "alert alert-danger"
    ',

    errorLabelContainer: 'output-area',
        errorElement: "div"


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
        email: {
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

            if($(".alert-success").length => 1) {
                $("#contact")[0].reset()
            }
            }
        })
     }
})
})