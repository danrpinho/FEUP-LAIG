#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float selRed;
uniform float selGreen;
uniform float selBlue;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);
	float colorVariance = cos(timeFactor) * 0.5 + 0.5;

	color.r = color.r * (1.0 - colorVariance) + colorVariance * selRed;
	color.g = color.g * (1.0 - colorVariance) + colorVariance * selGreen;
	color.b = color.b * (1.0 - colorVariance) + colorVariance * selBlue;

	gl_FragColor = color;
}


