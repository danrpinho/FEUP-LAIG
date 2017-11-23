#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float timeFactor;
uniform float selRed;
uniform float selGreen;
uniform float selBlue;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);
	float colorVariance = abs(cos(timeFactor));

	color.r = color.r * (1-colorVariance) + colorVariance * selRed;
	color.g = color.g * (1-colorVariance) + colorVariance * selGreen;
	color.b = color.b * (1-colorVariance) + colorVariance * selBlue;

	gl_FragColor = color;
}


