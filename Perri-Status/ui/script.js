$(() => {
    let inChange = false;
    let left = true;
    let map = false;

    window.addEventListener("message", (event) => {
        let e = event.data;

        if (e.action === "act") {
            $("#vidaBar").css({"height": Math.round(e.health) + "%", "top": 100 - Math.round(e.health) + "%"});
            $("#comida").css({"height": Math.round(e.hunger) + "%", "top": 100 - Math.round(e.hunger) + "%"});
            $("#bebida").css({"height": Math.round(e.thirst) + "%", "top": 100 - Math.round(e.thirst) + "%"});
            $("#armadura").css({"height": Math.round(e.armour) + "%", "top": 100 - Math.round(e.armour) + "%"});
            $("#estamina").css({"height": Math.round(e.stamina) + "%", "top": 100 - Math.round(e.stamina) + "%"});
            $("#oxygen").css({"height": Math.round(e.oxygen) + "%", "top": 100 - Math.round(e.oxygen) + "%"});
            if (e.oxygen > -1 && e.oxygen < 95) {
                $('.ox').show(250);
            } else {
                $("#oxygen").css({"height": "0%", "top": "100%"});
                $('.ox').hide(250);
            }
            if (e.stamina > -1 && e.stamina < 95) {
                $("#estamina").css({"height": Math.round(e.stamina) + "%", "top": 100 - Math.round(e.stamina) + "%"});
                $('.sta').show(250);
            } else {
                $("#estamina").css({"height": "0%", "top": "100%"});
                $('.sta').hide(250);
            }
        }



        if (e.armour > 1 && e.armour < 150) {
            $("#armadura").css({"height": Math.round(e.armour) + "%", "top": 100 - Math.round(e.armour) + "%"});
            $('.escudo').show(250);
        } else {
            $("#armadura").css({"height": "0%", "top": "100%"});
            $('.escudo').hide(250);
        }




        function animateBar(translateX, rotateAngles) {
            anime({
                targets: '.barra',
                translateX: translateX,
                translateY: 0,
                rotate: anime.stagger(rotateAngles),
                delay: function(el, i) {
                    switch(i) {
                        case 0: return 1000;
                        case 1: return 500;
                        case 2: return 200;
                        case 3: return 0;
                        case 4: return 750;
                        case 5: return 1500;
                        default: return 0;
                    }
                },
                duration: 1000,
                easing: 'easeOutElastic(.6, 1)'
            });
        }
        
        function changeInProgress() {
            setTimeout(function() {
                inChange = false;
            }, 1500);
        }
        
        if (e.minimap && left && !map && !inChange) {
            left = false;
            inChange = true;
            animateBar(e.anchor.x + (e.anchor.width * screen.width) + 20, [360, 360]);
            changeInProgress();
        } else if (!e.minimap && !left && !map && !inChange) {
            left = true;
            inChange = true;
            animateBar(0, [0, 0]);
            changeInProgress();
        }
        
    });
});


