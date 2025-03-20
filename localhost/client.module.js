
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@2.0.0/mod.js"

import {
    f_o_html_from_o_js,
    f_o_proxified_and_add_listeners
} from "https://deno.land/x/handyhelpers@5.1.96/mod.js"


o_variables.n_rem_font_size_base = 1. // adjust font size, other variables can also be adapted before adding the css to the dom
o_variables.n_rem_padding_interactive_elements = 0.5; // adjust padding for interactive elements 
f_add_css(
    `
    body{
        min-height: 100vh;
        min-width: 100vw;
    }

    ${
        f_s_css_from_o_variables(
            o_variables
        )
    }
    `
);

import * as o_mod from "./@tarikjabiri/dxf/lib/index.esm.js";


let o_dxf;




let f_callback_beforevaluechange = function(a_s_path, v_old, v_new){
    console.log('a_s_path')
    console.log(a_s_path)
    let s_path = a_s_path.join('.');
    if(s_path == 'a_o_person.0.s_name'){
        console.log('name of first person will be changed')
    }
}
let f_callback_aftervaluechange = function(a_s_path, v_old, v_new){
    console.log('a_s_path')
    console.log(a_s_path)
    let s_path = a_s_path.join('.');
    if(s_path == 'a_o_person.0.s_name'){
        console.log('name of first person has been changed')
    }
}

let o_div = document;
let o_state = f_o_proxified_and_add_listeners(
    {
        s_name: "asdf",// ugly work around
        o_function: null,
        a_o_function:[
            {
                s_name: 'star', 
                s_function:`function(){
                    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
                    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
                    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}
                
                
                    return [
                        f_o_circle(f_o_vec2(0,0),260),
                        f_o_circle(f_o_vec2(0,0),250),
                        ...new Array(10).fill(0).map((v, n_idx)=>{
                            let ni = parseFloat(n_idx);
                            let n_tau = Math.PI*2;
                            let n_amp = 200;
                            return f_o_reg_poly(
                                f_o_vec2(
                                    Math.sin(n_tau*(1./10)*n_idx)*n_amp,
                                    Math.cos(n_tau*(1./10)*n_idx)*n_amp
                                ),
                                90,
                                3, 
                                (n_tau/3/2/2)-ni*(n_tau/10)//(n_tau/10)*0.02
                            )
                        })
                    ]
                }`
            },
            {
                s_name: "triangles", 
                s_function:`function(){
                    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
                    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
                    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}
                
                
                    return [
                        f_o_circle(f_o_vec2(0,0),190),
                        f_o_circle(f_o_vec2(0,0),210),
                        ...new Array(10).fill(0).map((v, n_idx)=>{
                            let n_tau = Math.PI*2;
                            let n_amp = 200;
                            return f_o_reg_poly(
                                f_o_vec2(
                                    Math.sin(n_tau*(1./10)*n_idx)*n_amp,
                                    Math.cos(n_tau*(1./10)*n_idx)*n_amp
                                ),
                                90,
                                3, 
                                (n_tau/3/2/2)+(n_tau/10)*n_idx
                            )
                        })
                    ]
                }`
            }, 
            {
                s_name: 'intro', 
                s_function: `function(){
                    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
                    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
                    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}
                
                
                    return [
                        // draw a line like this 
                        f_o_line(f_o_vec2(2,3), f_o_vec2(3,4)),
                        //draw a circle like this
                        f_o_circle(f_o_vec2(2,3),20),
                        // draw a regular polygon like this
                        f_o_reg_poly(f_o_vec2(2,3,),5, 10), 
                        ...new Array(10).fill(0).map((v, n_idx)=>{
                            let n_tau = Math.PI*2;
                            let n_amp = 2;
                            return f_o_reg_poly(
                                f_o_vec2(
                                    Math.sin(n_tau*(1./10)*n_idx)*n_amp,
                                    Math.cos(n_tau*(1./10)*n_idx)*n_amp
                                ),
                                10,
                                3, 
                                (1./10)*n_idx
                            )
                        })
                    ]
                }`
            }, 
            {
                s_name: "reg_poly_loop", 
                s_function:`function() {
                    let f_o_vec2 = function (n_trn_x, n_trn_y) { return { n_trn_x, n_trn_y } }
                    let f_o_line = function (o_trn, o_trn2) { return { o_trn, o_trn2 } }
                    let f_o_circle = function (o_trn, n_radius) { return { o_trn, n_radius } }
                    let f_o_reg_poly = function (o_trn, n_radius, n_corners, n_offset_radians) { return { o_trn, n_radius, n_corners, n_offset_radians } }
                
                
                    let a_o = [];
                    let n_its = 10.;
                    let n_radius_factor = 200.;
                    let n_tau = Math.PI * 2;
                    for (let n_it = 0; n_it < n_its; n_it += 1) {
                        let n_it_nor = n_it / n_its;
                        console.log({ n_it_nor })
                        a_o.push(
                            f_o_reg_poly(
                                f_o_vec2(0, 0),
                                Math.pow(n_it_nor,1./4.)*n_radius_factor,
                                3,
                                n_it_nor*2
                            )
                        )
                
                    }
                    return a_o
                
                }`
            }, 
            {
                s_name: "touching_pentagons", 
                s_function: `function generateTouchingPentagons() {
                    let f_o_vec2 = function(n_trn_x, n_trn_y) { return { n_trn_x, n_trn_y }; };
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians) {
                        return { o_trn, n_radius, n_corners, n_offset_radians };
                    };
                
                    let a_o = [];
                    let n_its = 10; // Number of polygons
                    let n_initial_radius = 20; // Initial radius of the first polygon
                    let n_scaling_factor = 1 / Math.cos(Math.PI / 5); // Scaling factor for radius
                    let n_rotation_angle = Math.PI / 5; // Rotation angle for each polygon
                
                    for (let n_it = 0; n_it < n_its; n_it++) {
                        let n_radius = n_initial_radius * Math.pow(n_scaling_factor, n_it);
                        let n_offset_radians = n_rotation_angle * n_it;
                
                        a_o.push(
                            f_o_reg_poly(
                                f_o_vec2(0, 0), // Center of the polygon
                                n_radius, // Radius of the polygon
                                5, // Number of sides (pentagon)
                                n_offset_radians // Rotation offset
                            )
                        );
                    }
                
                    return a_o;
                }`
            },
            {
                s_name: 'touching_n_gons', 
                s_function: `function(){
                    let f_a_o_touching_n_gons = function (n_sides, n_its, n_initial_radius) {
                        let f_o_vec2 = function (n_trn_x, n_trn_y) { return { n_trn_x, n_trn_y }; };
                        let f_o_reg_poly = function (o_trn, n_radius, n_corners, n_offset_radians) {
                            return { o_trn, n_radius, n_corners, n_offset_radians };
                        };
                
                        let a_o = []; // Array to store the polygons
                        let n_scaling_factor = 1 / Math.cos(Math.PI / n_sides); // Scaling factor for radius
                        let n_rotation_angle = Math.PI / n_sides; // Rotation angle for each polygon
                
                        for (let n_it = 0; n_it < n_its; n_it++) {
                            let n_radius = n_initial_radius * Math.pow(n_scaling_factor, n_it);
                            let n_offset_radians = n_rotation_angle * n_it;
                
                            a_o.push(
                                f_o_reg_poly(
                                    f_o_vec2(0, 0), // Center of the polygon
                                    n_radius, // Radius of the polygon
                                    n_sides, // Number of sides
                                    n_offset_radians // Rotation offset
                                )
                            );
                        }
                
                        return a_o;
                    }
                    return f_a_o_touching_n_gons(3, 10, 20)
                
                }
                
                `
            }, 
            {
                s_name:  'continious_line_start', 
                s_function: `function generateStar() {
                    let f_o_vec2 = function (n_trn_x, n_trn_y) { return { n_trn_x, n_trn_y }; };
                    let f_o_line = function (o_trn, o_trn2) { return { o_trn, o_trn2 }; };
                
                    let a_o = [];
                    let n_points = 5; // Number of star points
                    let n_outer_radius = 100; // Radius of the outer points
                    let n_inner_radius = 50; // Radius of the inner points
                    let n_tau = Math.PI * 2; // Full circle in radians
                
                    for (let n_it = 0; n_it <= n_points * 2; n_it += 1) {
                        let n_radius = n_it % 2 === 0 ? n_outer_radius : n_inner_radius;
                        let n_angle = (n_it / n_points) * n_tau;
                        let o_point = f_o_vec2(
                            Math.sin(n_angle) * n_radius,
                            Math.cos(n_angle) * n_radius
                        );
                
                        if (n_it > 0) {
                            a_o.push(f_o_line(o_previous_point, o_point));
                        }
                        o_previous_point = o_point;
                    }
                    return a_o;
                }
                
                // Draw the star
                return generateStar();`
            }, 
            {
                s_name : 'something', 
                s_function : `function(){
                    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
                    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
                    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}
                
                    let n_its = 5
                    return [
                        ...new Array(n_its).fill(0).map((v, n_idx)=>{
                            let n_it= parseFloat(n_idx);
                            let n_tau = Math.PI*2;
                            let n_amp = 200;
                            let n_it_nor = n_it/n_its;
                            let n_it_nor2 = ((n_it+1)%n_its)/n_its
                            let o_prev = f_o_vec2(
                                        Math.sin(n_tau*n_it_nor)*n_amp,
                                        Math.cos(n_tau*n_it_nor)*n_amp
                                    );
                            let o_next = f_o_vec2(
                                        Math.sin(n_tau*n_it_nor2)*n_amp,
                                        Math.cos(n_tau*n_it_nor2)*n_amp
                                    )
                            return [
                                f_o_line(
                                    f_o_vec2(0,0),
                                    o_prev
                                ), 
                                f_o_line(o_prev, o_next)
                            ]
                        }).flat()
                    ]
                }`
            }, 
            {
                s_name: 'something2', 
                s_function: `function(){
                    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
                    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
                    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}
                
                    let n_its_corners = 5
                    let n_its_polygons = 10
                    
                    return [
                        ...new Array(n_its_polygons).fill(0).map((v, n_idx1)=>{
                            let n_it1_nor = parseInt(n_idx1)/n_its_polygons;
                            return new Array(n_its_corners).fill(0).map((v, n_idx)=>{
                            let n_it= parseFloat(n_idx);
                            let n_tau = Math.PI*2;
                            let n_amp = parseFloat(n_it1_nor)*250;
                            n_it+=(0.5)*(n_idx1%2);
                            let n_it_nor = n_it/n_its_corners;
                            let n_it_nor2 = ((n_it+1)%n_its_corners)/n_its_corners
                            let o_prev = f_o_vec2(
                                        Math.sin(n_tau*n_it_nor)*n_amp,
                                        Math.cos(n_tau*n_it_nor)*n_amp
                                    );
                            let o_next = f_o_vec2(
                                        Math.sin(n_tau*n_it_nor2)*n_amp,
                                        Math.cos(n_tau*n_it_nor2)*n_amp
                                    )
                            return [
                                f_o_line(
                                    f_o_vec2(0,0),
                                    o_prev
                                ), 
                                f_o_line(o_prev, o_next)
                            ]
                        }).flat()
                        }).flat()
                       
                    ]
                }`
            }
        ],
        a_s_name: [
            'hans', 
            'frida', 
            'gretel', 
            'ferdinand'
        ]
    }, 
    f_callback_beforevaluechange,
    f_callback_aftervaluechange, 
    o_div
)

globalThis.o_state = o_state
o_state.o_function = o_state.a_o_function[0]

let f_sleep_ms = async function(n_ms){
    return new Promise((f_res, f_rej)=>{
        setTimeout(()=>{
            return f_res(true)
        },n_ms)
    })
}


let o_el_svg = null;
// then we build the html 
let o = await f_o_html_from_o_js(
    {
        class: "test",
        style: "display: flex;flex-direction: row;",
        f_a_o: ()=>{
            return [
                {
                    id: "editor", 
                    style: 'width:50vw;height: 100vh;'
                },
                { 
                    style: 'width:50vw;height: 100vh;',
                    f_a_o: ()=>{
                        return [
                            {
                                id: "svg",
                                // f_after_render: (o_el)=>{
                                //     o_el_svg = o_el
                                // }
                            }, 
                            {
                                s_tag: "button", 
                                innerText: "download", 
                                onclick: ()=>{
                                    // Download DXF
                                    const blob = new Blob([o_dxf.toString()], { type: "application/dxf" });
                                    const link = document.createElement("a");
                                    link.href = URL.createObjectURL(blob);
                                    link.download = `${o_state.s_name}.dxf`;
                                    link.click();

                                }
                            }, 
                            {
                                s_tag: "select", 
                                f_a_o: ()=>{
                                    return [
                                        ...o_state.a_o_function.map(o=>{
                                            return {
                                                s_tag: "option", 
                                                value: o.s_name, 
                                                innerText: o.s_name
                                            }
                                        }), 
                                        {
                                            s_tag: 'option', 
                                            value: 'new', 
                                            innerText: "new"
                                        }
                                    ]
                                }, 
                                onchange: (o_e)=>{
                                    let s_name = o_e.target.value;
                                    if(s_name == 'new'){
                                        o_state.o_function = {s_name: 'new', s_function:o_monaco_editor.getValue()}
                                        o_state.a_o_function.push(o_state.o_function)
                                    }else{
                                        o_state.o_function = o_state.a_o_function.find(o=>{return o.s_name == s_name});
                                    }
                                    o_state.s_name = o_state.o_function.s_name
                                    f_update_from_o_function(o_state.o_function)

                                }
                            }, 
                            {
                                s_tag: "input", 
                                a_s_prop_sync: `s_name`
                            }
                        ]
                    }
                }
            ]
        }
    }, 
    o_state
)
document.body.appendChild(o);
let f_a_o_item = function(){
    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}


    return [
        // draw a line like this 
        f_o_line(f_o_vec2(2,3), f_o_vec2(3,4)),
        //draw a circle like this
        f_o_circle(f_o_vec2(2,3),20),
        // draw a regular polygon like this
        f_o_reg_poly(f_o_vec2(2,3,),5, 10), 
        ...new Array(10).fill(0).map((v, n_idx)=>{
            let n_tau = Math.PI*2;
            let n_amp = 2;
            return f_o_reg_poly(
                f_o_vec2(
                    Math.sin(n_tau*(1./10)*n_idx)*n_amp,
                    Math.cos(n_tau*(1./10)*n_idx)*n_amp
                ),
                10,
                3, 
                (1./10)*n_idx
            )
        })
    ]
}

function drawObjectsToDXFAndSVG(a_o_items) {
    // Initialize DXF
    o_dxf = new o_mod.DxfWriter();
    
    // Create SVG element
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    let o_el_div = document.querySelector('#svg');
    
    o_el_div.innerHTML = '';
    o_el_div?.appendChild(svg);
    svg.setAttribute("width", "500");
    svg.setAttribute("height", "500");
    svg.setAttribute("viewBox", "0 0 500 500");

    // Apply a transform to flip the y-axis
    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("transform", "scale(1, -1) translate(0, -500)");
    svg.appendChild(g);

    // Center of the SVG canvas
    let n_trn_x_center = 250; // 500 / 2
    let n_trn_y_center = 250; // 500 / 2
    let o_trn;
    let o_trn2;
    // Iterate over objects
    a_o_items.forEach(o_item => {
        // Use original coordinates (no y-axis flip needed)
        if(o_item.o_trn){
            o_trn = {
                n_trn_x: o_item.o_trn.n_trn_x + n_trn_x_center,
                n_trn_y: o_item.o_trn.n_trn_y + n_trn_y_center
            };
        }
        if(o_item.o_trn2){
            o_trn2 = {
                n_trn_x: o_item.o_trn2.n_trn_x + n_trn_x_center,
                n_trn_y: o_item.o_trn2.n_trn_y + n_trn_y_center
            };
        }

        if (o_item.o_trn && o_item.o_trn2) {
            // Draw line to DXF
            // o_mod.addEntities(
            //     new o_mod.Line(o_dxf, ,o_trn2.n_trn_x, o_trn2.n_trn_y)
            // );
            o_dxf.addLine(o_mod.point3d(o_trn.n_trn_x, o_trn.n_trn_y), o_mod.point3d(o_trn2.n_trn_x, o_trn2.n_trn_y))

            // Draw line to SVG
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", o_trn.n_trn_x);
            line.setAttribute("y1", o_trn.n_trn_y);
            line.setAttribute("x2", o_trn2.n_trn_x);
            line.setAttribute("y2", o_trn2.n_trn_y);
            line.setAttribute("stroke", "white");
            g.appendChild(line); // Append to the transformed group
        } else if (o_item.o_trn && o_item.n_radius && !o_item.n_corners) {
            // Draw circle to DXF
            // o_dxf.addEntities(
            //     new o_mod.Circle(o_dxf, o_trn.n_trn_x, o_trn.n_trn_y, o_item.n_radius),
            // );
            o_dxf.addCircle(o_mod.point3d(o_trn.n_trn_x, o_trn.n_trn_y), o_item.n_radius)

            // Draw circle to SVG
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", o_trn.n_trn_x);
            circle.setAttribute("cy", o_trn.n_trn_y);
            circle.setAttribute("r", o_item.n_radius);
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", "white");
            g.appendChild(circle); // Append to the transformed group
        } else if (o_item.o_trn && o_item.n_radius && o_item.n_corners) {
            // Draw regular polygon to DXF
            const vertices = createRegularPolygon(
                o_trn.n_trn_x,
                o_trn.n_trn_y,
                o_item.n_radius,
                o_item.n_corners,
                o_item.n_offset_radians
            );
            // o_dxf.addEntities(
            //     new o_mod.LwPolyline(o_dxf, vertices.map(v => [v.x, v.y]), true),
            // );
   
            // const polyline = new o_mod.HatchPolylineBoundary();
            // vertices.forEach(v => polyline.add(o_mod.vertex(v.x, v.y)))
            
            o_dxf.addLWPolyline(
                vertices.map(v => { return {point:o_mod.point2d(v.x, v.y)}})
            );

            // o_dxf.addPolyLine(vertices.map(v => o_mod.point3d(v.x,v.y)));
            // Draw regular polygon to SVG
            const polygon = document.createElementNS(svgNS, "polygon");
            const points = vertices.map(v => `${v.x},${v.y}`).join(" ");
            polygon.setAttribute("points", points);
            polygon.setAttribute("fill", "none");
            polygon.setAttribute("stroke", "white");
            g.appendChild(polygon); // Append to the transformed group
        }
    });
}

// Function to create a regular polygon
function createRegularPolygon(x, y, radius, corners, n_offset_radians = 0) {
    const vertices = [];
    for (let i = 0; i < corners; i++) {
        const angle = (Math.PI * 2 * i) / corners + n_offset_radians;
        const px = x + radius * Math.cos(angle);
        const py = y - radius * Math.sin(angle); // Flip y-axis for SVG
        vertices.push({ x: px, y: py });
    }
    // Close the loop by adding the first vertex again
    vertices.push(vertices[0]);
    return vertices;
}
// import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/+esm';


// require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.33.0/min/vs' }});
// require.config({ paths: { 'vs': './monaco-editor-0.52.2/package/min/vs' }});
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs' }});

let o_monaco_editor = null;
require(['vs/editor/editor.main'], function() {
    o_monaco_editor = monaco.editor.create(document.getElementById('editor'), {
        value: f_a_o_item.toString(),
        language: 'javascript',
        theme: 'vs-dark'
    });
    // Listen for content changes
    o_monaco_editor.onDidChangeModelContent((event) => {
        console.log('Content changed:', o_monaco_editor.getValue());
        let s = o_monaco_editor.getValue();
        let s_f = `(${s})()`;
        console.log(s_f)  
        let a_o = eval(s_f);

        console.log(a_o)
        drawObjectsToDXFAndSVG(a_o)

    });
    f_update_from_o_function(o_state.o_function)

});

let f_update_from_o_function = function(o_function){
    if(o_monaco_editor){
        o_monaco_editor.setValue(
            o_function.s_function
        );
    }
}


let f_a_o = function(){
    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}

    let n_its = 3.;
    let n_radius = 200; 
    let n_tau = Math.PI*2.;
    let a_o = [
        f_o_circle(
            f_o_vec2(0,0), n_radius
        ), 
        f_o_reg_poly(
            f_o_vec2(0,0),
            40, 
            4, 
            0.2
        )
    ]
    for(let n_it = 0.; n_it < n_its; n_it+=1){
        let n_it_nor = n_it / n_its;
        a_o.push(
            f_o_line(
                f_o_vec2(0,0), 
                f_o_vec2(
                    Math.cos(n_it_nor*n_tau)*n_radius, 
                    Math.sin(n_it_nor*n_tau)*n_radius
                )
            )
        )
    }
    return a_o

}

let a_o_test = f_a_o();
console.log(a_o_test)
drawObjectsToDXFAndSVG(a_o_test);
const blob = new Blob([o_dxf.stringify()], { type: "application/dxf" });
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = `atest.dxf`;
link.click();
