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
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addAnimation = function (nodeID) {
    this.animations.push(nodeID);
}


/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function (leaf) {
    this.leaves.push(leaf);
}


