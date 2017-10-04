/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, type, args) {
    this.graph = graph;
    var argArray = split(args);

    switch (type) {
        case 'rectangle':   //4 arguments, coords of topleft and bottomright points in xy plane
            var x1 = parseFloat(argArray[0]);
            var y1 = parseFloat(argArray[1]);
            var x2 = parseFloat(argArray[2]);
            var y2 = parseFloat(argArray[3]);
            this.obj = new MyQuad(this.graph.scene, x1, y1, x2, y2);
            break;
        case 'triangle':    //9 arguments, coords of all three points
            var x1 = parseFloat(argArray[0]);
            var y1 = parseFloat(argArray[1]);
            var z1 = parseFloat(argArray[2]);
            var x1 = parseFloat(argArray[3]);
            var y1 = parseFloat(argArray[4]);
            var z1 = parseFloat(argArray[5]);
            var x1 = parseFloat(argArray[6]);
            var y1 = parseFloat(argArray[7]);
            var z1 = parseFloat(argArray[8]);
            this.obj = new MyTriangle(this.graph.scene, x1, y1, z1, x2, y2, z2, x3, y3, z3);
            break;
        case 'cylinder':    //5 arguments, height, bottom and top raiduses, stacks and slices
            var height = parseFloat(argArray[0]);
            var bottomRadius = parseFloat(argArray[1]);
            var topRadius = parseFloat(argArray[2]);
            var stacks = parseInt(argArray[3]);
            var slices = parseInt(argArray[4]);
            this.obj = new MyCylinder(this.graph.scene, slices,stacks,bottomRadius,topRadius,height);
            break;
        case 'sphere':      //3 arguments, radius, stacks and slices
            var radius = parseFloat(argArray[0]);   //raio
            var stacks = parseInt(argArray[1]);     //rodelas
            var slices = parseInt(argArray[2]);     //fatias
            this.obj = new MySphere(this.graph.scene,radius,slices,stacks);
            break;
    };

}