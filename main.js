
var SpeechRecognition = window.webkitSpeechRecognition;
var reco = new SpeechRecognition();

var btnWhatsApp = document.getElementsByClassName("btn-wa")[0];

function start(){
    document.getElementById("textbox").innerHTML = "";
    reco.start();
}

reco.onresult = function(event){
    console.log(event);

    var Content = event.results[0][0].transcript;
    console.log(Content);
    document.getElementById("textbox").innerHTML = Content;
    if(Content =="Take my selfie."){
        console.log("taking selfie---");
        speak();

    }
    else{speak_error()}
    
}

function speak(){
    var synth = window.speechSynthesis;

    speak_data = "Taking Your Selfie in 5 seconds"


    var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
Webcam.attach(camera)



setTimeout(function()
{
    take_snapshot();
    save()
},5000
)
}
function speak_error(){
    var synth = window.speechSynthesis;

    speak_data = "Sorry I could not understand that Please say 'take my selfie'"


    var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);

}

Webcam.set({
    width:360,
    height:250,
    image_format : 'png',
    png_quality :99
});
camera = document.getElementById("camera");


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_img" src="'+data_uri+'">';
    }
)
}


function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}


btnWhatsApp.addEventListener("click", async function() {
    image = document.getElementById("selfie_img").src;
    var res =  await fetch(image);
    var blob = await res.blob();

    var file = new File([blob], "selfie.jpg", {type: blob.type})
    
    await navigator.share({
        title: "selfiee",
        files:[file]    
    })
    .then((res) => console.log(res))
})
