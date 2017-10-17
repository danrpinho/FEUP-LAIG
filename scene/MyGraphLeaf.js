/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, node) {
    this.graph = graph;

    //gets item from the xml block
    var type = this.graph.reader.getItem(node, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle', 'patch']);
    
    //checks if the leaf has a valid type
    if (type != null)
        this.graph.log("   Leaf: " + type);
    else
        this.graph.warn("Error in leaf");

    //acquires arguments and depending on the leaf type, calls the correct constructor
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
            this.obj = new MyCylinder(this.graph.scene, slices, stacks, bottomRadius, topRadius, height, topCap, botCap);
            break;
        case 'sphere':      //3 arguments, radius, stacks and slices
            var radius = parseFloat(argArray[0]);   //raio
            var stacks = parseInt(argArray[1]);     //rodelas
            var slices = parseInt(argArray[2]);     //fatias
            this.obj = new MySphere(this.graph.scene, radius, slices, stacks);
            break;
        case 'patch':       //3 arguments, divisions in u, divisions in v, control vertexes
            var udiv = parseInt(argArray[0]);
            var vdiv = parseInt(argArray[1]);
            var children = node.children;
            var controlvertexes = [];                       //control vertex array creation
            for (var i = 0; i < children.length; i++) {
                //auxiliar function to parse the additional xml tags
                this.parseCPLine(children[i], controlvertexes);
            }
            this.obj = new MyPatch(this.graph.scene, udiv, vdiv, controlvertexes);
            break;
        default:
            this.graph.warn("Unknown leaf type <" + type + ">");
    };

}

MyGraphLeaf.prototype.parseCPLine = function (cplNode, controlvertexes) {
    //checks if the tag is the right one
    if (cplNode.nodeName != "CPLINE") {
        this.onXMLMinorError("unknown tag <" + cplNode.nodeName + ">");
        return 1;
    }

    var children = cplNode.children;
    var cpline = [];

    //goes along the CPOINTS for the line
    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeName != "CPOINT") {
            this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
            continue;
        }
        cpline.push([]);
        var x = this.graph.reader.getFloat(children[i], 'xx');
        cpline[cpline.length - 1].push(x);
        var y = this.graph.reader.getFloat(children[i], 'yy');
        cpline[cpline.length - 1].push(y);
        var z = this.graph.reader.getFloat(children[i], 'zz');
        cpline[cpline.length - 1].push(z);
        var w = this.graph.reader.getFloat(children[i], 'ww');
        cpline[cpline.length - 1].push(w);
    }
    controlvertexes.push(cpline);

    return 0;
}