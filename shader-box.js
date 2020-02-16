!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ShaderBox=e():t.ShaderBox=e()}(window,function(){return function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i(i.s=0)}([function(t,e,i){var s,r,h;h=i(1)(),s=class{constructor(t){var e,i,s,r,h,o;for(this.setViewport=this.setViewport.bind(this),this.canvas=t.canvas,this.grid=t.grid||[1,1],this.shaders=[],this.pos=[],this.gl=this.canvas.getContext("experimental-webgl",t.context||{antialias:!0,depth:!1}),this.gl||alert("failed to start webgl :("),this.focus=-1,this.setViewport(),t.resize&&window.addEventListener("resize",this.setViewport),t.clearColor?this.gl.clearColor(t.clearColor[0],t.clearColor[1],t.clearColor[2],t.clearColor[3]):this.gl.clearColor(0,0,0,1),o=e=0,s=this.grid[1];0<=s?e<s:e>s;o=0<=s?++e:--e)for(h=i=0,r=this.grid[0];0<=r?i<r:i>r;h=0<=r?++i:--i)this.pos.push({x:h,y:o});this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}createBuffer(t,e,i){var s,r,h,o,a;return s=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,s),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(i),this.gl.STATIC_DRAW),r=1-this.grid[0]+2*t,h=this.grid[1]-1-2*e,s.u_move={origin:[r,h],state:[r,h],stage:[r,h]},o=1/this.grid[0],a=1/this.grid[1],s.u_scale={origin:[o,a],state:[o,a],stage:[o,a]},s}setViewport(){var t,e,i,s,r;for(this.canvas.width=this.width=this.canvas.clientWidth,this.canvas.height=this.height=this.canvas.clientHeight,this.gl.viewport(0,0,this.width,this.height),s=[],t=0,e=(i=this.shaders).length;t<e;t++)r=i[t],s.push(r.setUvBuffer(r.index));return s}add(t){return t.init(this,this.shaders.length),this.shaders.push(t),this}clear(){return this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this}draw(t){var e,i,s,r,h,o,a;if(!t.gl)throw new Error("shader has not been added.");for(i=i||0,a=t.vert_buffer,this.gl.useProgram(t.program),t.updateUvBuffer(),this.focus>=0?t.index===this.focus?(a.u_move.state[0]=a.u_move.state[1]=0,a.u_scale.state[0]=a.u_scale.state[1]=1):a.u_scale.state[0]=a.u_scale.state[1]=0:(a.u_move.state[0]=a.u_move.origin[0],a.u_move.state[1]=a.u_move.origin[1],a.u_scale.state[0]=a.u_scale.origin[0],a.u_scale.state[1]=a.u_scale.origin[1]),a.u_move.stage[0]+=.25*(a.u_move.state[0]-a.u_move.stage[0]),a.u_move.stage[1]+=.25*(a.u_move.state[1]-a.u_move.stage[1]),a.u_scale.stage[0]+=.25*(a.u_scale.state[0]-a.u_scale.stage[0]),a.u_scale.stage[1]+=.25*(a.u_scale.state[1]-a.u_scale.stage[1]),this.gl.uniform2f(t.u_move,a.u_move.stage[0],a.u_move.stage[1]),this.gl.uniform2f(t.u_scale,a.u_scale.stage[0],a.u_scale.stage[1]),s=0,r=(h=t._uniforms).length;s<r;s++)(o=h[s]).isArray?o.set(o.loc,t.uniforms[o.name].value):(e=t.uniforms[o.name],Array.isArray(e.value)?o.set(o.loc,e.value[0],e.value[1],e.value[2],e.value[3]):o.set(o.loc,e.value));return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a),this.gl.vertexAttribPointer(t.a_position,2,this.gl.FLOAT,!1,0,0),this.gl.enableVertexAttribArray(t.a_position),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t.uv_buffer),this.gl.vertexAttribPointer(t.a_texture,2,this.gl.FLOAT,!1,0,0),this.gl.enableVertexAttribArray(t.a_texture),t.texture&&(this.gl.bindTexture(this.gl.TEXTURE_2D,t.texture),this.gl.uniform1i(t.u_texture,0)),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this}},r=class{constructor(t){this.code=t.source,this.textureUrl=t.textureUrl,this.uniforms=t.uniforms,this._uniforms=[],this.focus=!1,this.uv=t.uv||[1,1]}updateUvBuffer(){return this.box.focus!==this.index||this.focus?this.box.focus!==this.index&&this.focus?(this.focus=!1,this.setUvBuffer(this.index)):void 0:(this.focus=!0,this.setUvBuffer(this.index))}setUvBuffer(t){var e,i,s;return this.focus?(i=this.box.width/this.uv[0],e=this.box.height/this.uv[1]):(i=this.box.width/this.uv[0]/this.box.grid[0],e=this.box.height/this.uv[1]/this.box.grid[1]),s=.5-i/e/2,.5-e/i/2,0,this.uv_buffer=this.box.createBuffer(this.box.pos[t].x,this.box.pos[t].y,[s,1,s,0,1-s,1,1-s,0])}setVertBuffer(t){return this.vert_buffer=this.box.createBuffer(this.box.pos[t].x,this.box.pos[t].y,[-1,-1,-1,1,1,-1,1,1])}init(t,e){var i,s,r,o,a,u;for(s in this.box=t,this.index=e,this.setUvBuffer(this.index),this.setVertBuffer(this.index),this.gl=this.box.gl,this.program=this.createProgram(h,this.code),this.a_position=this.gl.getAttribLocation(this.program,"a_position"),this.a_texture=this.gl.getAttribLocation(this.program,"a_texture"),this.u_move=this.gl.getUniformLocation(this.program,"u_move"),this.u_scale=this.gl.getUniformLocation(this.program,"u_scale"),this.u_texture=this.gl.getUniformLocation(this.program,"u_texture"),this.textureUrl&&(this.texture=this.gl.createTexture(),this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,new Uint8Array([0,0,255,255])),(i=new Image).crossOrigin="",i.src=this.textureUrl,i.addEventListener("load",t=>(this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.setUvBuffer(this.index)))),o=[],r=this.uniforms)u=r[s],a={loc:this.gl.getUniformLocation(this.program,s),set:this.gl["uniform"+u.type].bind(this.gl),name:s,isArray:null!=u.type.match(/v$/)},o.push(this._uniforms.push(a));return o}createProgram(t,e){var i,s,r;if(i=this.gl.createShader(this.gl.FRAGMENT_SHADER),this.gl.shaderSource(i,e),this.gl.compileShader(i),!this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS))throw new Error("\nFRAGMENT_COMPILE_ERROR:\n\n"+this.gl.getShaderInfoLog(i)+"\nSOURCE:\n\n"+this.gl.getShaderSource(i));if(r=this.gl.createShader(this.gl.VERTEX_SHADER),this.gl.shaderSource(r,t),this.gl.compileShader(r),!this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS))throw new Error("\nVERTEX_COMPILE_ERROR:\n\n"+this.gl.getShaderInfoLog(r)+"\nSOURCE:\n\n"+gl.getShaderSource(r));if(s=this.gl.createProgram(),this.gl.attachShader(s,i),this.gl.attachShader(s,r),this.gl.linkProgram(s),!this.gl.getProgramParameter(s,this.gl.LINK_STATUS))throw new Error("SHADER_LINK_"+this.gl.getProgramInfoLog(s));return s}},t.exports={Box:s,Shader:r}},function(t,e){t.exports=(t=>"attribute vec2 a_position;\nattribute vec2 a_texture;\nuniform vec2 u_move;\nuniform vec2 u_scale;\nvarying vec2 v_uv;\nvoid main() {\n\tgl_Position = vec4((a_position + u_move) * u_scale, 0.0, 1.0);\n\tv_uv = a_texture;\n}\n")}])});