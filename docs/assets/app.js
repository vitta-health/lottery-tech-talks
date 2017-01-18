(function() {
    var paper, circs, i, nowX, nowY, timer, props = {}, toggler = 0, elie, dx, dy, rad, cur, opa;
    // Returns a random integer between min and max
    // Using Math.round() will give you a non-uniform distribution!
    function ran(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function moveIt()
    {
        for(i = 0; i < circs.length; ++i)
        {
            // Reset when time is at zero
            if (! circs[i].time)
            {
                circs[i].time  = ran(30, 100);
                circs[i].deg   = ran(-179, 180);
                circs[i].vel   = ran(1, 5);
                circs[i].curve = ran(0, 1);
                circs[i].fade  = ran(0, 1);
                circs[i].grow  = ran(-2, 2);
            }
            // Get position
            nowX = circs[i].attr("cx");
            nowY = circs[i].attr("cy");
            // Calc movement
            dx = circs[i].vel * Math.cos(circs[i].deg * Math.PI/180);
            dy = circs[i].vel * Math.sin(circs[i].deg * Math.PI/180);
            // Calc new position
            nowX += dx;
            nowY += dy;
            // Calc wrap around
            if (nowX < 0) nowX = 1200 + nowX;
            else          nowX = nowX % 1200;
            if (nowY < 0) nowY = 620 + nowY;
            else          nowY = nowY % 620;

            // Render moved particle
            circs[i].attr({cx: nowX, cy: nowY});

            // Calc growth
            rad = circs[i].attr("r");
            if (circs[i].grow > 0) circs[i].attr("r", Math.min(30, rad +  .1));
            else                   circs[i].attr("r", Math.max(10,  rad -  .1));

            // Calc curve
            if (circs[i].curve > 0) circs[i].deg = circs[i].deg + 2;
            else                    circs[i].deg = circs[i].deg - 2;

            // Progress timer for particle
            circs[i].time = circs[i].time - 1;

            // Calc damping
            if (circs[i].vel < 1) circs[i].time = 0;
            else circs[i].vel = circs[i].vel - .05;

        }

        timer = setTimeout(moveIt, 60);
    }

    window.onload = function () {
        var width = 1300, height = 650;

        paper = Raphael("canvas", width, height);
        circs = paper.set();
        for (i = 0; i < 60; ++i)
        {
            opa = ran(1,2)/10;
            circs.push(paper.circle(
                ran(0,width),
                ran(0,height),
                ran(10,30)
            ).attr({"fill-opacity": opa, "stroke-opacity": opa}));
        }

        circs.attr({fill: "#53BDDD", stroke: "#53BDDD"});
        moveIt();
    };
}());

(function () {

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    var palestrantes = [
        'Gilson',
        'Thiagão',
        'Letícia',
        'Lucas',
        'Wash',
        'Flávio'
    ];

    function setCounter(i) {
        $("#counter-text").html(i);
    }

    function setCurrent(palestrante) {
        $("#current-text").html(palestrante);
        $('#current-text').effect('shake');
    }

    function addPalestrante(palestrante) {
        html = $("#list").html();
        html += palestrante + "<br>";
        $("#list").html(html);
    }

    counter = 0;
    y = 0;

    setInterval(function() {
        setCounter(counter++);

        if(y++ % 20 == 0){
            palestrante = palestrantes.shift();

            if(palestrante != undefined) {
                counter = 0;
                setCurrent(palestrante);
                addPalestrante(palestrante);
            }
        }
    }, 1 * 1000);

})();