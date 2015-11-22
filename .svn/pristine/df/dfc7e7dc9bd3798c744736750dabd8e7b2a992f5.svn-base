	//创建滑动导航构造函数
	function Slider(target) {
		this.dom = target.dom;
		this.lis = this.dom.getElementsByTagName("li");
		
		this.Width = this.dom.offsetWidth;
		console.log(this.Width);
		this.Click();
		this.move();
	}
	Slider.prototype.Click = function() {
		var lis = this.lis;
		for (var i = 0; i < lis.length; i++) {
			
			lis[i].onclick = function() {
				for (var j = 0; j < lis.length; j++) {
					lis[j].className = ' ';  //循环干死li
				}
				this.className = 'nav_hover';  //当前的li 
			}
		}
	}
	Slider.prototype.move = function() {
		var self = this;
		var touchStart = function(e) {
			self.startX = e.touches[0].pageX;
			self.stime = new Date() * 1;
			self.touchX = 0;

			var reg=/\-?[0-9]+/g;
			self.leftX = parseInt(getComputedStyle(self.dom,null).webkitTransform.match(reg)[4]);
			console.log(getComputedStyle(self.dom,null).webkitTransform);
			self.dom.style.webkitTransition = '0s';	//触摸开始时 让动画效果为0

		}
		var touchMove = function(e) {
			e.preventDefault();
			self.touchX = (e.touches[0].pageX - self.startX);  
			
				self.moveX = (self.touchX + self.leftX);
				self.dom.style.webkitTransition = '-webkit-transform .4s ease-out';
				self.dom.style.webkitTransform = 'translate3d('+ self.moveX +'px,0,0)';
		}
		var touchEnd = function(e) {
			self.lastRight = parseInt(self.Width - window.innerWidth -5);  //判断屏幕自适应ul右侧是否到头
			var etime = new Date() * 1;
			var lis = self.lis;
			
			 if (self.moveX >= 15) { //判断左是否到头的弹性恢复
			 	console.log(1);
				self.dom.style.webkitTransition = '-webkit-transform .5s ease';
				self.dom.style.webkitTransform = 'translate3d(0,0,0)';

			}else if(self.moveX <= -self.lastRight){   //判断右是否到头的弹性恢复
				self.dom.style.webkitTransition = '-webkit-transform .5s ease';
				self.dom.style.webkitTransform = 'translate3d('+ -self.lastRight +'px,0,0)';
			}
		}
		this.dom.addEventListener('touchstart',touchStart);
		this.dom.addEventListener('touchmove',touchMove);
		this.dom.addEventListener('touchend',touchEnd);
	}
	//滑动导航方法结束 
