# particle_animation  
https://longteng33.github.io/particle_animation/  
canvas制作的粒子运动动画   
## 类语法的使用：  
### 1、以class开头，构造函数constructor， 
### 2、原型上的方法直接写在下面  
### 3、类的继承，使用关键字extends，一定要在constructor中调用super()  
### 4、子类没有this指向，直接借助父类的this指向，所以必须要先调用super，调用一下父类的构造函数，子类才有this  