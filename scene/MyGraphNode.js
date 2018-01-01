/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    this.animations = [];

    // The material ID.
    this.materialID = null;

    // The texture ID.
    this.textureID = null;

    this.selectable = false;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function (nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds an Animation to this node.
 */
MyGraphNode.prototype.addAnimation = function (animation) {
    this.animations.push(animation);
}

/**
* Deletes the last animation
*/
MyGraphNode.prototype.undoAnimation = function(){
    this.animations.pop();
}

/**
* Clears Animations
*/
MyGraphNode.prototype.clearAnimations = function() {
    this.animations = [];
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function (leaf) {
    this.leaves.push(leaf);
}


