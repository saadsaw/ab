// Creating An Instance Of CytoscapeJS
let cy = cytoscape({
    // Selecting The Container To Render In
    container: document.getElementById('cy'),

    // Disabling User Zooming
    userZoomingEnabled: false,

    // Creating The Elements Of The Graph (Nodes & Edges)
    elements: {
        // The Nodes
        nodes: [
            { data: { id: 'A' } },
            { data: { id: 'B' } },
            { data: { id: 'C' } },
            { data: { id: 'D' } },
            { data: { id: 'E' } },
            { data: { id: 'F' } },
            { data: { id: 'G' } },
            { data: { id: 'H' } },
            { data: { id: 'I' } },
            { data: { id: 'J' } },
            { data: { id: 'K' } },
        ],
        // The Edges
        edges: [
            { data: { id: 'AB', source: 'A', target: 'B' } }, // A -> B
            { data: { id: 'AC', source: 'A', target: 'C' } }, // A -> C
            { data: { id: 'BD', source: 'B', target: 'D' } }, // B -> D
            { data: { id: 'BE', source: 'B', target: 'E' } }, // B -> E
            { data: { id: 'CF', source: 'C', target: 'F' } }, // C -> F
            { data: { id: 'CG', source: 'C', target: 'G' } }, // C -> G
            { data: { id: 'DH', source: 'D', target: 'H' } }, // D -> H
            { data: { id: 'EI', source: 'E', target: 'I' } }, // E -> I
            { data: { id: 'EJ', source: 'E', target: 'J' } }, // E -> J
            { data: { id: 'FK', source: 'F', target: 'K' } } // F -> K
        ]
    },

    // Styling The Elements Of The Graph In Plain JSON Format
    style: [
        // Styling The Nodes
        {
            selector: 'node',
            style: {
                // The Color Of The Nodes
                'background-color': 'red',
                // The Label Of The Nodes (Their ID)
                'label': 'data(id)',
                // Centering The Label Text Vertically
                'text-valign': 'center',
                // Centering The Label Text Horizontally
                'text-halign': 'center',
                // The Color Of The Label Text
                'color': 'white'
            }
        },
        // Styling The Edges
        {
            selector: 'edge',
            style: {
                // The Content Of The Edges (Visible Only If They Have A Weight)
                'label': 'data(weight)',
                // The Shape Of The Edge Arrow Pointing To The Target Node
                'target-arrow-shape': 'triangle',
                // The Color Of The Edge Arrow Pointing To The Target Node
                'target-arrow-color': 'blue',
                // The Curving Method Between The Nodes
                'curve-style': 'bezier',
                // The Width Of The Edge
                'width': '4'
            }
        },
        // Highlighted Element Styles
        {
            selector: '.highlighted',
            style: {
                'background-color': 'cyan',
                'line-color': 'cyan',
                'target-arrow-color': 'cyan',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
            }
        },
        // Goal Node style
        {
            selector: '.goalNode',
            style: {
                'background-color': 'pink'
            }
        }
    ],

    // Selecting The Appropriate Layout For The Graph
    layout: {
        // The Name Of The Layout
        name: 'breadthfirst',
        // Whether The Graph Is Directed Or Not
        directed: true,
        // The Root Of The Graph
        roots: '#A'
    }
});

function fillDropdowns() {
    let nodes = cy.filter('node');
    let startField = document.getElementById('start-node');
    let goalField = document.getElementById('goal-node');
    for (let i = 0; i < nodes.length; i++) {
        let el = document.createElement('option');
        el.textContent = nodes[i].data('id');
        el.value = nodes[i].data('id');
        startField.appendChild(el);
    }
    for (let i = 0; i < nodes.length; i++) {
        let el = document.createElement('option');
        el.textContent = nodes[i].data('id');
        el.value = nodes[i].data('id');
        goalField.appendChild(el);
    }
}

fillDropdowns();

async function start() {
    let sn = document.getElementById('start-node').value;
    let gn = document.getElementById('goal-node').value;
    let found = false;
    if (sn && gn) {
        // Performing A Breadth First Search (BFS) On Our Graph Elements
        let dfs = cy.elements().dfs({
            // Selecting The Node To Start The Search From
            roots: '#' + sn,
            // Indicating That The Graph Is A Directed Graph
            directed: true,
            // What Happens When A Node Is Visited In The Search
            visit: function(v, e, u, i, depth) {
                // If Goal Is Found
                if (v.data('id') == gn) {
                    found = true;
                    return true;
                }
            }
        });
        
        // Animation Code
        for (let i = 0; i < dfs.path.length; i++) {
            dfs.path[i].addClass('highlighted');
            if (dfs.path[i].data('id') == gn) {
                dfs.path[i].addClass('goalNode');
                break;
            }
            await sleep(1000); // Wait 1 second before the next iteration
        }
    } else {
        alert("Please select a starting and a goal node.");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}