/**
 * Created by lai on 2016/5/31.
 */

//权值
var position = [
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
[ 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0 ],
[ 0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0 ],
[ 0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0 ],
[ 0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0 ],
[ 0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0 ],
[ 0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0 ],
[ 0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0 ],
[ 0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0 ],
[ 0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0 ],
[ 0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0 ],
[ 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0 ],
[ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ];

//棋型
var ChessShape = [[
    [/11111/g], [/22222/g] //连五,1
], [
    [/011110/g], [/022220/g]//活四,2
], [
    [/011112/g, /0101110/g, /0110110/g], [/022221/g, /0202220/g, /0220220/g]//冲四,3
], [
    [/01110/g, /010110/g], [/02220/g, /020220/g]//活三,4
], [
    [/001112/g, /010112/g, /011012/g, /10011/g, /10101/g, /2011102/g], [/002221/g, /020221/g, /022021/g, /20022/g, /20202/g, /1022201/g] //眠三,5
], [
    [/00110/g, /01010/g, /010010/g], [/00220/g, /02020/g, /020020/g]//活二,6
], [
    [/000112/g, /001012/g, /010012/g, /10001/g, /2010102/g, /2011002/g], [/000221/g, /002021/g, /020021/g, /20002/g, /1020201/g, /1022001/g]//眠二,7
], [
    [/211112/g], [/122221/g] //死四,8
], [
    [/21112/g], [/12221/g] //死三,9
], [
    [/2112/g], [/1221/g] //死二,10
]];

//分值
var Scores = [
    100000,     //长连
    10000,      //活4、双冲4、冲4活
    5000,       //双活3
    1000,       //活3眠3
    500,        //眠4
    200,        //活3
    100,        //双活2
    50,         //眠3
    10,         //活2眠2
    5,          //活2
    3,          //眠2
    -5          //死4,死3,死2
];

//
//var NewChessShape = {
//    CON_5: {
//        name: '长连',
//        index: 0,
//        regex: ["11111", "22222"],
//        score: 100000
//    },
//    ALIVE_4: {
//        name: '活4',
//        index: 1,
//        regex: ["011110", "022220"],
//        score: 10000
//    },
//    GO_4: {
//        name: '冲4',
//        index: 2,
//        regex: ["011112|0101110|0110110", "022221|0202220|0220220"],
//        score: 500
//    },
//    DEAD_4: {
//        name: '死4',
//        index: 3,
//        regex: ["211112", "122221"],
//        score: -5
//    },
//    ALIVE_3: {
//        name: '活3',
//        index: 4,
//        regex: ["01110|010110", "02220|020220"],
//        score: 100000
//    },
//    ALIVE_4: {
//        name: '活4',
//        index: 0,
//        regex: ["11111", "22222"],
//        score: 100000
//    },
//    ALIVE_4: {
//        name: '活4',
//        index: 0,
//        regex: ["11111", "22222"],
//        score: 100000
//    }
//}("����", 0, new String[] { "11111", "22222" }, 100000), ALIVE_4(
//"����", 1, new String[] { "011110", "022220" }, 10000), GO_4(
//    "����", 2, new String[] { "011112|0101110|0110110",
//    "022221|0202220|0220220" }, 500), DEAD_4("����", 3,
//    new String[] { "211112", "122221" }, -5), ALIVE_3("����", 4,
//    new String[] { "01110|010110", "02220|020220" }, 200), SLEEP_3(
//    "����", 5, new String[] {
//    "001112|010112|011012|10011|10101|2011102",
//        "002221|020221|022021|20022|20202|1022201" }, 50), DEAD_3(
//    "����", 6, new String[] { "21112", "12221" }, -5), ALIVE_2("���",
//    7, new String[] { "00110|01010|010010", "00220|02020|020020" },
//5), SLEEP_2("�߶�", 8, new String[] {
//    "000112|001012|010012|10001|2010102|2011002",
//        "000221|002021|020021|20002|1020201|1022001" }, 3), DEAD_2(
//    "����", 9, new String[] { "2112", "1221" }, -5), NULL("null", 10,
//    new String[] { "", "" }, 0);
//
////
var wu = {
    Map: [],
    GameObj: null,
    MapObj: null,
    ChessManList: [],
    curChessMan: 1,
    player: 1,

    //棋盘背景图片信息
    imgInfo: {
        w: 535.00,
        h: 535.00,
        b: 23.00,
        g: 60.00
    },

    //初始化
    init: function(){
        this.initGame();
    },

    //初始化
    initGame: function(){
        this.drawMap();
        this.setMapClickEvent();
    },

    //Map
    drawMap: function(){
        var me = this;
        //初始化Ｍap
        for(var i = 0; i < 15; i++) {
            me.Map[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        //绘制Map
        this.GameObj = $('<div id="game" class="game-box"></div>');
        $('body').append(me.GameObj);
        var objw = me.GameObj.width();
        me.MapObj = $('<div id="map" class="map-box"></div>').css({height: objw, marginTop: -(objw/2)});
        me.GameObj.append(me.MapObj);
    },

    //设置Map点击事件
    setMapClickEvent: function(){
        var me = this;
        this.MapObj.on('click', function(e){
            if(this.player === this.curChessMan) {
                e = event || window.event;
                var oft = (me.GameObj.height() - $(this).height())/2;
                var a = me.GameObj.width()*1.00/me.imgInfo.w;
                var b = (me.GameObj.width()- 2 * me.imgInfo.b * a)/14;
                if(me.drawChessMan(parseInt(e.clientX/b), parseInt((e.clientY - oft)/b), me.curChessMan)) {
                    me.curChessMan = me.curChessMan === 1 ? 2:1;
                }
            }
            setTimeout(function(){
                var pos = me.AI(me.curChessMan);
                if(me.drawChessMan(pos[0], pos[1], me.curChessMan)) {
                    me.curChessMan = me.curChessMan === 1 ? 2:1;
                }
            }, 1000)
        });
    },

    //ChessMan
    drawChessMan: function(x,y,who){
        //修改Map状态
        if(this.Map[x][y] === 0) {
            this.Map[x][y] = who;
            if(this.judgeWin(x, y, who)) {
                alert(who, 'if winer');
            }
        }else {
            console.log('has ChessMan');
            return false;
        }

        //放入列表中
        var c = {x: x, y: y, who: who};
        this.ChessManList.push(c);

        //绘制ChessMan
        var ChessMan;
        if(who == 1) {
            ChessMan = $('<div class="chessman hei"></div>');
        }else {
            ChessMan = $('<div class="chessman bai"></div>');
        }
        var a = this.GameObj.width()*1.00/this.imgInfo.w;
        var b = (this.GameObj.width()- 2 * this.imgInfo.b * a)/14;
        var posTop = this.imgInfo.b * a+y * b-b/2;
        var posleft = this.imgInfo.b * a+x * b-b/2;
        ChessMan.css({top: posTop, left: posleft, width: b, height: b});
        this.MapObj.append(ChessMan);
        return true;
    },

    //电脑计算在哪落子
    AI: function(who){
        var i = 0, j = 0, maxvalue = 0, curvalue = 0, pos = [0, 0], value = [], num = 0;
        for(i = 0; i < 15; i++){
            for(j = 0; j < 15; j++){
                if(this.Map[i][j] === 0) {
                    value = this.calcValue(this.judgeChessShape(i, j, who));
                    curvalue = value[0] + value[1] + position[i][j];
                    if(maxvalue < curvalue){
                        console.log('1111111111111111111111111111111111111111111111', maxvalue)
                        maxvalue = curvalue;
                        pos[0] = i;
                        pos[1] = j;
                    }
                }
            }
        }
        return pos;
    },

    //判断是否获胜
    judgeWin: function(x, y, who){
        var num = 0, i, j;
        //判断纵向
        for(i = -4; i <= 0; i++) {
            for(j = i; j < i+5; j++) {
                if(y + j >= 0 && y + j < 15 && this.Map[x][y+j] === who) {
                    num ++;
                    if(num === 5) {
                        return true;
                    }
                }else {
                    num = 0;
                    break;
                }
            }
        }
        //判断横向
        for(i = -4; i <= 0; i++) {
            for(j = i; j < i+5; j++) {
                if(x + j > 0 && x + j < 15 && this.Map[x+j][y] === who) {
                    num ++;
                    if(num === 5) {
                        return true;
                    }
                }else {
                    num = 0;
                    break;
                }
            }
        }
        //判断右斜
        for(i = -4; i <= 0; i++) {
            for(j = i; j < i+5; j++) {
                if(x + j >= 0 && y - j >= 0 && x + j < 15 && y - j < 15 && this.Map[x+j][y-j] === who) {
                    num ++;
                    if(num === 5) {
                        return true;
                    }
                }else {
                    num = 0;
                    break;
                }
            }
        }
        //判断左斜
        for(i = -4; i <= 0; i++) {
            for(j = i; j < i+5; j++) {
                if(x - j >= 0 && y + j >= 0 && x - j < 15 && y + j < 15 && this.Map[x-j][y+j] === who) {
                    num ++;
                    if(num === 5) {
                        return true;
                    }
                }else {
                    num = 0;
                    break;
                }
            }
        }
        return false;
    },

    //判断棋型
    judgeChessShape: function(x, y, who){
        var str = [['', ''], ['', ''], ['', ''], ['', '']];
        var CShapes = [], CShape = [];
        var i = 0, j = 0, num = 0;
        for (i = 0; i < 15; i++){
            //横
            if(x === i){
                str[0][0] += (who+'');
                str[0][1] += who === 1 ? '2' : '1';
            }else {
                str[0][0] += (this.Map[i][y]+'');
                str[0][1] += (this.Map[i][y]+'');
            }
            //竖
            if(y === i){
                str[1][0] += (who+'');
                str[1][1] += who === 1 ? '2' : '1';
            }else {
                str[1][0] += (this.Map[x][i]+'');
                str[1][1] += (this.Map[x][i]+'');
            }
        }
        //撇
        if(x+y > 14) {
            for(i = 0; i < (24-(x+y)); i++){
                if(x === 14 - i && y === (x+y)-14 + i){
                    str[2][0] += (who+'');
                    str[2][1] += who === 1 ? '2' : '1';
                }else {
                    str[2][0] += (this.Map[14 - i][(x+y)-14 + i]+'');
                    str[2][1] += (this.Map[14 - i][(x+y)-14 + i]+'');
                }
            }
        }else {
            for(i = 0; i < (x+y); i++){
                if(x === x+y - i && y === i){
                    str[2][0] += (who+'');
                    str[2][1] += who === 1 ? '2' : '1';
                }else {
                    str[2][0] += (this.Map[x+y - i][i]+'');
                    str[2][1] += (this.Map[x+y - i][i]+'');
                }
            }
        }
        //捺
        if(x > y) {
            for(i = 0; i < 14-(x-y); i++){
                if(x === (x-y) + i && y === i){
                    str[3][0] += (who+'');
                    str[3][1] += who === 1 ? '2' : '1';
                }else {
                    str[3][0] += (this.Map[(x-y) + i][i]+'');
                    str[3][1] += (this.Map[(x-y) + i][i]+'');
                }
            }
        }else {
            for(i = 0; i < 14-(y-x); i++){
                if(x === i && y === (y-x) + i){
                    str[3][0] += (who+'');
                    str[3][1] += who === 1 ? '2' : '1';
                }else {
                    str[3][0] += (this.Map[i][(y-x) + i]+'');
                    str[3][1] += (this.Map[i][(y-x) + i]+'');
                }
            }
        }

        if(who === 1){
            console.log(x, y, '-:', str[0][0],'|:', str[1][0],'/:', str[2][0], '\\:', str[3][0]);
            console.log(x, y, '-:', str[0][1],'|:', str[1][1],'/:', str[2][1], '\\:', str[3][1]);
        }else {
            console.log(x, y, '-:', str[0][1],'|:', str[1][1],'/:', str[2][1], '\\:', str[3][1]);
            console.log(x, y, '-:', str[0][0],'|:', str[1][0],'/:', str[2][0], '\\:', str[3][0]);
        }
        for(j = 0; j < 4; j++){
            CShape = [];
            for (i = 0; i < 10; i++){
                CShape.push(this.findChessShape(i, j, str, who));
            }
            CShapes.push(CShape);
        }
        return CShapes;//返回四个方向的棋型
    },

    //匹配类型，返回类型数组
    findChessShape: function(chessshape, dir, astr, who){
        var i = 0, j = 0, arry = [], cs = [[],[]];
        var arry1 = ChessShape[chessshape][who-1];
        arry1 = arry1 === null ? [] : arry1;
        for(i = 0; i < arry1.length; i++){
            arry = astr[dir][0].match(arry1[i]);
            arry = arry === null ? [] : arry;
            for(j = 0; j < arry.length; j++){
                cs[0].push(chessshape);
            }
            arry = astr[dir][0].split('').reverse().join('').match(arry1[i]);
            arry = arry === null ? [] : arry;
            for(j = 0; j < arry.length; j++){
                cs[0].push(chessshape);
            }
        }
        var arry2 = ChessShape[chessshape][who === 1 ? 1 : 0];
        arry2 = arry2 === null ? [] : arry2;
        for(i = 0; i < arry2.length; i++){
            arry = astr[dir][1].match(arry2[i]);
            arry = arry === null ? [] : arry;
            for(j = 0; j < arry.length; j++){
                cs[1].push(chessshape);
            }
            arry = astr[dir][1].split('').reverse().join('').match(arry2[i]);
            arry = arry === null ? [] : arry;
            for(j = 0; j < arry.length; j++){
                cs[1].push(chessshape);
            }
        }

        return cs;
    },

    //计算分值
    calcValue: function(arry){
        var attackValue = 0, defendValue = 0;
        var i = 0, j = 0;
        var l = arry.length, ll = 0;
        var anum = 0, _anum = 0, dnum = 0, _dnum = 0;
        //判断是否连5
        for (i = 0; i < l; i++){
            ll = arry[i][0][0].length;
            if(ll > 0){
                attackValue += Scores[0];
            }
            ll = arry[i][0][1].length;
            if(ll > 0){
                defendValue += Scores[0];
            }
        }
        //判断是否活4、双冲4、冲4活
        //活4
        for (i = 0; i < l; i++){
            ll = arry[i][1][0].length;
            if(ll > 0){
                attackValue += Scores[1];
            }
            ll = arry[i][1][1].length;
            if(ll > 0){
                defendValue += Scores[1];
            }
        }
        //双冲4
        for (i = 0; i < l; i++){
            anum += arry[i][2][0].length;
            dnum += arry[i][2][1].length;
        }
        if(anum > 1) {
            attackValue += (anum-1)*Scores[1];
            anum = 0;
        }
        if(dnum > 1) {
            defendValue += (dnum-1)*Scores[1];
            dnum = 0;
        }
        //冲4活
        for (i = 0; i < l; i++){
            anum += arry[i][2][0].length;
            _anum += arry[i][3][0].length;
            dnum += arry[i][2][1].length;
            _dnum += arry[i][3][1].length;
        }
        if(anum >= 1 && _anum >= 1) {
            attackValue += (anum-1)*Scores[1];
            anum = 0;
            _anum = 0;
        }
        if(dnum >= 1 && _dnum >= 1) {
            defendValue += (dnum-1)*Scores[1];
            dnum = 0;
            _dnum = 0;
        }
        //判断是否双活3
        for (i = 0; i < l; i++){
            anum += arry[i][3][0].length;
            dnum += arry[i][3][1].length;
        }
        if(anum > 1) {
            attackValue += (anum-1)*Scores[2];
            anum = 0;
        }
        if(dnum > 1) {
            defendValue += (dnum-1)*Scores[2];
            dnum = 0;
        }
        //判断是否活3眠3
        for (i = 0; i < l; i++){
            anum += arry[i][3][0].length;
            _anum += arry[i][4][0].length;
            dnum += arry[i][3][1].length;
            _dnum += arry[i][4][1].length;
        }
        if(anum >= 1 && _anum >= 1) {
            attackValue += (anum-1)*Scores[3];
            anum = 0;
            _anum = 0;
        }
        if(dnum >= 1 && _dnum >= 1) {
            defendValue += (dnum-1)*Scores[3];
            dnum = 0;
            _dnum = 0;
        }
        //判断是否眠4
        for (i = 0; i < l; i++){
            anum += arry[i][2][0].length;
            dnum += arry[i][2][1].length;
        }
        if(anum == 1) {
            attackValue += (anum-1)*Scores[4];
            anum = 0;
        }
        if(dnum == 1) {
            defendValue += (dnum-1)*Scores[4];
            dnum = 0;
        }
        //判断是否活3
        for (i = 0; i < l; i++){
            anum += arry[i][3][0].length;
            dnum += arry[i][3][1].length;
        }
        if(anum == 1) {
            attackValue += (anum-1)*Scores[5];
            anum = 0;
        }
        if(dnum == 1) {
            defendValue += (dnum-1)*Scores[5];
            dnum = 0;
        }
        //判断是否双活2
        for (i = 0; i < l; i++){
            anum += arry[i][5][0].length;
            dnum += arry[i][5][1].length;
        }
        if(anum > 1) {
            attackValue += (anum-1)*Scores[6];
            anum = 0;
        }
        if(dnum > 1) {
            defendValue += (dnum-1)*Scores[6];
            dnum = 0;
        }
        //判断是否眠3
        for (i = 0; i < l; i++){
            anum += arry[i][4][0].length;
            dnum += arry[i][4][1].length;
        }
        if(anum == 1) {
            attackValue += (anum-1)*Scores[7];
            anum = 0;
        }
        if(dnum == 1) {
            defendValue += (dnum-1)*Scores[7];
            dnum = 0;
        }
        //判断是否活2眠2
        for (i = 0; i < l; i++){
            anum += arry[i][5][0].length;
            _anum += arry[i][6][0].length;
            dnum += arry[i][5][1].length;
            _dnum += arry[i][6][1].length;
        }
        if(anum >= 1 && _anum >= 1) {
            attackValue += (anum-1)*Scores[8];
            anum = 0;
            _anum = 0;
        }
        if(dnum >= 1 && _dnum >= 1) {
            defendValue += (dnum-1)*Scores[8];
            dnum = 0;
            _dnum = 0;
        }
        //判断是否活2
        for (i = 0; i < l; i++){
            anum += arry[i][5][0].length;
            dnum += arry[i][5][1].length;
        }
        if(anum == 1) {
            attackValue += (anum-1)*Scores[9];
            anum = 0;
        }
        if(dnum == 1) {
            defendValue += (dnum-1)*Scores[9];
            dnum = 0;
        }
        //判断是否眠2
        for (i = 0; i < l; i++){
            anum += arry[i][6][0].length;
            dnum += arry[i][6][1].length;
        }
        if(anum == 1) {
            attackValue += (anum-1)*Scores[10];
            anum = 0;
        }
        if(dnum == 1) {
            defendValue += (dnum-1)*Scores[10];
            dnum = 0;
        }
        //判断是否死4,死3,死2
        //死4
        for (i = 0; i < l; i++){
            anum += arry[i][7][0].length;
            dnum += arry[i][7][1].length;
        }
        if(anum == 1) {
            attackValue += (anum-1)*Scores[11];
            anum = 0;
        }
        if(dnum == 1) {
            defendValue += (dnum-1)*Scores[11];
            dnum = 0;
        }
        //死3
        for (i = 0; i < l; i++){
            anum += arry[i][8][0].length;
            dnum += arry[i][8][1].length;
        }
        if(anum == 1) {
            attackValue += (anum-1)*Scores[11];
            anum = 0;
        }
        if(dnum == 1) {
            defendValue += (dnum-1)*Scores[11];
            dnum = 0;
        }
        //死2
        for (i = 0; i < l; i++){
            anum += arry[i][9][0].length;
            dnum += arry[i][9][1].length;
        }
        if(anum == 1) {
            attackValue += (anum-1)*Scores[11];
            anum = 0;
        }
        if(dnum == 1) {
            defendValue += (dnum-1)*Scores[11];
            dnum = 0;
        }
        return [attackValue, defendValue];
    }
};

wu.init();