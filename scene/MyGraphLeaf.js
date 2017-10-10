/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph,  node) {
    this.graph = graph;
    var type = this.graph.reader.getItem(node, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle', 'patch']);
     if (type != null)
         this.graph.log("   Leaf: " + type);
      else
                            this.graph.warn("Error in leaf");
    var args = this.graph.reader.getString(node, 'args');
    var argArray = args.split(' ');

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
            var x2 = parseFloat(argArray[3]);
            var y2 = parseFloat(argArray[4]);
            var z2 = parseFloat(argArray[5]);
            var x3 = parseFloat(argArray[6]);
            var y3 = parseFloat(argArray[7]);
            var z3 = parseFloat(argArray[8]);
            this.obj = new MyTriangle(this.graph.scene, x1, y1, z1, x2, y2, z2, x3, y3, z3);
            break;
        case 'cylinder':    //7 arguments, height, bottom and top raiduses, stacks and slices, top cap and bottom cap
            var height = parseFloat(argArray[0]);
            var bottomRadius = parseFloat(argArray[1]);
            var topRadius = parseFloat(argArray[2]);
            var stacks = parseInt(argArray[3]);
            var slices = parseInt(argArray[4]);
            var topCap = parseInt(argArray[5]);
            var botCap = parseInt(argArray[6]);
            this.obj = new MyCylinder(this.graph.scene, slices,stacks,bottomRadius,topRadius,height,topCap,botCap);
            break;
        case 'sphere':      //3 arguments, radius, stacks and slices
            var radius = parseFloat(argArray[0]);   //raio
            var stacks = parseInt(argArray[1]);     //rodelas
            var slices = parseInt(argArray[2]);     //fatias
            this.obj = new MySphere(this.graph.scene,radius,slices,stacks);
            break;
        case 'patch':

            break;
    };

}

MyGraphLeaf.prototype.parsePatch = function (patchNode){
    
}