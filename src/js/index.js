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

var posWeight = [{
    Scores: 100000
}, {
    ChessShape: ['011112', '022221'],
    Scores: 10000
}, {
    ChessShape: ['0101110', '0202220'],
    Scores: 10000
}];

//棋型
var ChessShape = [[
    ['11111'], ['22222'] //连五,1
], [
    ['011110'], ['022220']//活四,2
], [
    ['011112', '0101110', '0110110'], ['022221', '0202220', '0220220']//冲四,3
], [
    ['01110', '010110'], ['02220', '020220']//活三,4
], [
    ['001112', '010112', '011012', '10011', '10101', '2011102'], ['002221', '020221', '022021', '20022', '20202', '1022201'] //眠三,5
], [
    ['00110', '01010', '010010'], ['00220', '02020', '020020']//活二,6
], [
    ['000112', '001012', '010012', '10001', '2010102', '2011002'], ['000221', '002021', '020021', '20002', '1020201', '1022001']//眠二,7
], [
    ['211112'], ['122221'] //死四,8
], [
    ['21112'], ['12221'] //死三,9
], [
    ['2112'], ['1221'] //死二,10
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
var wu = {
    Map: [],
    GameObj: null,
    MapObj: null,
    ChessManList: [],
    curChessMan: 1,

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
            e = event || window.event;
            var oft = (me.GameObj.height() - $(this).height())/2;
            var a = me.GameObj.width()*1.00/me.imgInfo.w;
            var b = (me.GameObj.width()- 2 * me.imgInfo.b * a)/14;
            if(me.drawChessMan(parseInt(e.clientX/b), parseInt((e.clientY - oft)/b), me.curChessMan)) {
                me.curChessMan = me.curChessMan === 1 ? 2:1;
            }
        });
    },

    //ChessMan
    drawChessMan: function(x,y,who){
        //修改Map状态
        if(this.Map[x][y] === 0) {
            this.Map[x][y] = who;
            this.judgeChessShape(x, y, who);
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
    //判断是否获胜
    judgeChessShape: function(x, y, who){
        var str = ['', '', '', ''];
        var ChessShapes = [], ChessShape = [];
        for (var i = 0; i < 15; i++){
            if(x === i){//横
                str[0] += (who+'');
            }else {
                str[0] += (this.Map[i][y]+'');
            }
            if(y === i){//竖
                str[1] += (who+'');
            }else {
                str[1] += (this.Map[x][i]+'');
            }
            if(y === i && x === 15-i){//撇
                str[2] += (who+'');
            }else {
                str[2] += (this.Map[15-i][i]+'');
            }
            if(x === i && y === 15-i){//捺
                str[3] += (who+'');
            }else {
                str[4] += (this.Map[i][15-i]+'');
            }
        }
        for (i = 0; i < 10; i++){
            ChessShape[i][who]
        }
        return [];//返回四个方向的棋型
    }
};

wu.init();