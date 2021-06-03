
//---------ʹ�����α���������ģ����Բ2---------------------
//�˷���Ҳ�������lineWidth�Ͽ���Բ�ϱ�ʱ
//������˽ϼ��񣬲�ƽ��������
//���ַ�����ǰһ��������������ȷ�ȸߣ���Ч���Բ�
function drawBezierEllipse2(ctx, x, y, a, b, isSelected, isContinue, isFinished)
{
   var k = .5522848,
   ox = a * k, // ˮƽ���Ƶ�ƫ����
   oy = b * k; // ��ֱ���Ƶ�ƫ����

   ctx.beginPath();
   //����Բ����˵㿪ʼ˳ʱ������������α���������
   ctx.moveTo(x - a, y);
   ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
   ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
   ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
   ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
   ctx.closePath();
   ctx.stroke();
};

function drawArrow(ctx, x1, y1, x2, y2, isSelected)
{
};

function state(name, isContinue, isFinish, machine) {
	this.m_name = name;
	this.m_isContinue = isContinue;
	this.m_isFinish = isFinish;
	this.m_matches = new Array();
	this.m_colored = false;
	this.m_level = 0;
	this.m_levelPos = 1;
	this.m_x = 0;
	this.m_y = 0;
	this.m_a = 0;
	this.m_b = 0;
	this.m_nextStart = 0;
	this.m_nextEnd = 0;
	this.m_machine = machine;
	this.m_isSelected = false;
}

state.prototype = {
	draw:function(context) {
		//draw this
		//draw arrow
		this.m_matches[j].m_colored = true;
		drawBezierEllipse2(context, this.m_x, this.m_y,
				this.m_a, this.m_b, this.m_isSelected,
				this.m_isContinue, this.m_isFinished);

		for(var j = 0; j < len; ++j) {
			if(this.m_matches[j].m_colored == false) {
				drawArrow(context, this.m_x, this.m_y,
						this.m_matches[j].m_state.m_x,
						this.m_matches[j], .m_state.y, false);
				this.m_matches[j].m_newState.draw(context);
			}
		}
	},
	initLevel:function(level, levelPos){
		this.m_level = level;
		var len = this.m_matches.length;
		this.m_colored = true;
		if(levelPos.length <= level) {
			levelPos[level] = 1;
		} else {
			++levelPos[level];
		}
		this.m_levelPos = levelPos[level];
		if(this.m_machine.m_maxLevelPos < this.m_levelPos) {
			this.m_machine.m_maxLevelPos = this.m_levelPos;
		}
		for(var j = 0; j < len; ++j) {
			if(this.m_matches[j].m_colored == false) {
					this.m_nextEnd = this.m_matches[j].m_newState.initLevel(level + 1);
					if(!this.m_nextStart) {
						this.m_nextStart = this.m_nextEnd;
					}
			}
		}
		return this.m_levelPos;
	},
	initPos:function(){
		var levelPos;
		if(this.m_levelPos < this.m_nextStart) {
			levelPos = (this.m_nextStart + this.m_nextEnd) / 2
		} else {
			levelPos = this.m_levelPos;
		}
		maxXPos = this.m_machine.m_levelPos[m_level];
		this.m_x = this.m_machine.m_width * levelPos / maxXPos;
		this.m_y = this.m_machine.m_height * m_level / m_maxLevel;
		this.m_a = this.m_machine.m_width / this.m_maxLevelPos;
		this.m_a = this.m_machine.m_height / this.m_maxLevel;
		
	},

	addMatch:function(match) {
		this.m_matches.push(match);
	},
	clearColor:function() {
		this.m_colored = true;
	}
};

function stateMachine()
{
	this.m_states = new Array();
	this.m_matches = new Array();
	this.m_levelPos = new Array();
	this.m_maxLevel;
	this.m_maxLevelPos = 0;
}

stateMachine.prototype = {
	setStart = function(stateName) {
		for(var j = 0; j < this.m_states.length; ++j) {
			if(this.m_states[j].m_name == stateName) {
				this.m_startState = this.m_states[j];
				return;
			}
		}
		this.m_startStateName = stateName;
	},
	addState = function(state){
		this.m_states.push(state);
	},
	clearColor = function() {
		for(var j = 0; j < this.m_states.length; ++j) {
			this.m_states.clearColor();
		}
	}
	initpos = function() {
		var level = 0;
		var levelPos = new Array();
		clearColor();
		initPos(x, y, level, levelPos);
	}
	addMatchDefine = function(match){
		this.m_matches.push(match);
	},
	addMatch = function(stateName, matchName){
		var len = this.m_states.length;
		var oldState;
		var match;
		for(var j = 0; j < len; ++j) {
			if(this.m_states[j].m_name == stateName) {
				oldState = this.m_states[j];
				j = len;
			}
		}
		len = this.m_matches.length;
		for(var j = 0; j < len; ++j) {
			if(this.m_matches[j].m_name == matchName) {
				matche = this.m_matches[j];
				oldState.addMatch(match);
				j = len;
			}
		}
	},
	drawStateMachine:function (context, canvas) {
		clearColor();
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.m_startState.draw(context, canvas.width, canvas.height);
	}
}


// �������д�����Բ.
var drawableObjects = [];

var canvas;
var context;

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.onmousedown = canvasClick;
  canvas.onmouseup = stopDragging;//����ɿ���ֹͣ�϶�
  canvas.onmouseout = stopDragging;
  canvas.onmousemove = dragCircle;
};

function addRandomCircle() {
  // �������������Ͱ뾶.
  var radius = randomFromTo(10, 60);
  var x = randomFromTo(0, canvas.width);
  var y = randomFromTo(0, canvas.height);

  // �������ɫ.
  var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
  var color = colors[randomFromTo(0, 8)];

  // ����Բ.
  var circle = new Circle(x, y, radius, color);

  // ���浽����.
  drawableObjects.push(circle);

  // �ػ�canvas.
  drawCircles();
}

function clearCanvas() {
  circles = [];
  // Update the display.
  drawCircles();
}

function drawCircles() {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);

  for(var i=0; i<circles.length; i++) {
    var obj = drawableObjects[i];
    obj.draw(context);
  }
}

var previousSelectedCircle;//��¼ǰһ��ѡ�е�Բ

function canvasClick(e) {
  //��ȡ�����canvas�е����λ��.
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  // �жϵ�����ĸ�Բ.
  for(var i=circles.length-1; i>=0; i--) {
    var obj = drawableObjects[i];
    if(obj.checkSelected(clickX, clickY)) {
    	previousSelectedCircle = obj;
    }
  }
}



var isDragging = false;

function stopDragging() {
  isDragging = false;
}
