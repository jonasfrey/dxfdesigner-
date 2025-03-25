
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

import * as THREE from '/three.js-r126/build/three.module.js';
// import { OrbitControls } from '/three/OrbitControls.js';
import { OrbitControls } from '/three.js-r126/examples/jsm/controls/OrbitControls.js';
import { STLExporter } from '/three.js-r126/examples/jsm/exporters/STLExporter.js';
// import { STLExporter } from '/three/STLExporter.js';
// if you need more addons/examples download from here...
//  


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
    if(s_path == 'n_thickness'){
        f_update_rendering();
    }
}

let o_div = document;
let o_state = f_o_proxified_and_add_listeners(
    {
        n_thickness :0.5, 
        s_name: "asdf",// ugly work around
        o_function: null,
        a_o_function:[
            {
                s_name: "line", 
                s_function:`function(){
                    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
                    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
                    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}
                
                
                    return [
                        f_o_line(f_o_vec2(0,0), f_o_vec2(200,200)),
                    ]
                }`
            },
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
            }, 
            {
                s_name: 'loops2', 
                s_function: `function(){
                    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
                    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
                    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}
                
                    let n_its_corners = 5
                    let n_its_polygons = 10
                    
                    let n_tau = Math.PI*2;
                    let n_its1 = 6;
                    let n_its2 = 5;
                    let a_o = []
            
                    for(let n_it1 = 0; n_it1 < n_its1; n_it1+=1){
                        let n_it1_nor = n_it1/n_its1;
                        let n_amp1 = 100;
                        let o_trn = f_o_vec2(
                            Math.cos(n_it1_nor*n_tau)*n_amp1, 
                            Math.sin(n_it1_nor*n_tau)*n_amp1, 
                        );
                        for(let n_it2 = 0; n_it2 < n_its2; n_it2+=1){
                            let n_it2_nor = n_it2/n_its2;
                            let n_amp = n_it2_nor * 100;
                            a_o.push(
                                f_o_circle(
                                    o_trn, 
                                    n_amp
                                )
                            )
                            
                        }
                    }
            
            return a_o
            }`
            }, 
            {
                s_name: 'another_one', 
                s_function: `function(){
                    let f_o_vec2 = function(n_trn_x, n_trn_y){return {n_trn_x, n_trn_y}}
                    let f_o_line = function(o_trn, o_trn2){return {o_trn, o_trn2}}
                    let f_o_circle = function(o_trn, n_radius){return {o_trn, n_radius}}
                    let f_o_reg_poly = function(o_trn, n_radius, n_corners, n_offset_radians){return {o_trn, n_radius, n_corners, n_offset_radians}}
                
                    let n_its_corners = 5
                    let n_its_polygons = 10
                    
                    let n_tau = Math.PI*2;
                    let n_its1 = 10;
                    let n_its2 = 5;
                    let a_o = []

                    for(let n_it1 = 0; n_it1 < n_its1; n_it1+=1){
                        let n_radius = 100; 
                        let n_amp1 = 50
                        let n_it1_nor = n_it1/n_its1;
                        let o_trn = f_o_vec2(
                            //0,//
                            //n_it1_nor*200//
                            Math.sin(n_it1_nor*n_tau)*n_amp1, 
                            Math.cos(n_it1_nor*n_tau)*n_amp1 
                        );
                        let n_corners = 4; 
                        let n_offset_radians = n_it1_nor*n_tau/2;
                        a_o.push(
                                f_o_reg_poly(
                                    o_trn, 
                                    n_radius, 
                                    n_corners, 
                                    n_offset_radians
                                )
                            )
                    }
            
            return a_o
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
                                id: 'canvas',
                            },
                            {
                                s_tag: "button", 
                                innerText: "download", 
                                onclick: ()=>{
                                    // Download DXF
                                    const blob = new Blob([o_dxf.stringify()], { type: "application/dxf" });
                                    const link = document.createElement("a");
                                    link.href = URL.createObjectURL(blob);
                                    link.download = `${o_state.s_name}.dxf`;
                                    link.click();
                                    f_export_stl();


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
                            }, 
                            {
                                s_tag: "input", 
                                type: 'number',
                                a_s_prop_sync: `n_thickness`
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
// Creates a solid cylinder between two points
function f_create_solid_cylinder(o_start, o_end, n_radius = 0.5, material) {
    const start = new THREE.Vector3(o_start.n_trn_x, o_start.n_trn_y, 0);
    const end = new THREE.Vector3(o_end.n_trn_x, o_end.n_trn_y, 0);
    
    const length = start.distanceTo(end);
    const center = new THREE.Vector3().lerpVectors(start, end, 0.5);
    
    const geometry = new THREE.CylinderGeometry(
        n_radius, n_radius, length, 16, 1, true
    );
    
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.copy(center);
    cylinder.lookAt(end);
    cylinder.rotation.x = Math.PI / 2;
    
    return cylinder;
}

// Creates a sphere to cap joints
function f_create_joint_sphere(o_point, n_radius = 0.5, material) {
    const geometry = new THREE.SphereGeometry(n_radius, 16, 16);
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(o_point.n_trn_x, o_point.n_trn_y, 0);
    return sphere;
}
// function f_create_solid_tube(a_o_points, n_radius = 0.5, n_segments = 8) {
//     const a_points = a_o_points.map(o => new THREE.Vector3(o.n_trn_x, o.n_trn_y, 0));
//     const o_curve = new THREE.CatmullRomCurve3(a_points);
    
//     // Extrude a circle along the curve to create a solid tube
//     const shape = new THREE.Shape();
//     shape.absarc(0, 0, n_radius, 0, Math.PI * 2); // Circular cross-section
    
//     const extrudeSettings = {
//         steps: 100,                  // Smoothness along the curve
//         bevelEnabled: false,         // No bevels
//         extrudePath: o_curve         // Follow the curve path
//     };
    
//     return new THREE.ExtrudeGeometry(shape, extrudeSettings);
// }


// 1. SAFE GEOMETRY CREATION (REVISED)
function f_create_solid_tube(a_o_points, n_radius = 0.5) {
    if (!a_o_points || a_o_points.length < 2) {
        console.warn("Invalid points array for tube creation");
        return null;
    }

    try {
        // Convert points to Vector3
        const points = a_o_points.map(p => {
            if (!p || p.n_trn_x === undefined || p.n_trn_y === undefined) {
                throw new Error("Invalid point data");
            }
            return new THREE.Vector3(p.n_trn_x, p.n_trn_y, 0);
        });

        // Create curve path
        const curve = new THREE.CatmullRomCurve3(points);
        const shape = new THREE.Shape();
        shape.absarc(0, 0, n_radius, 0, Math.PI * 2);

        // Extrusion settings
        const extrudeSettings = {
            steps: 100,
            bevelEnabled: false,
            extrudePath: curve
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.computeBoundingBox(); // Critical for camera fitting
        
        return geometry;
    } catch (e) {
        console.error("Tube creation failed:", e);
        return null;
    }
}

function createCylinderBetweenPoints(point1, point2, radius, material) {
    const p1 = new THREE.Vector3(point1.n_trn_x, point1.n_trn_y, 0);
    const p2 = new THREE.Vector3(point2.n_trn_x, point2.n_trn_y, 0);

    // Calculate the midpoint
    const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

    // Compute the direction vector
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();

    // Create cylinder geometry
    const geometry = new THREE.CylinderGeometry(radius, radius, length, 16);
    const cylinder = new THREE.Mesh(geometry, material);

    // Align cylinder with the direction
    cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

    // Position it at the midpoint
    cylinder.position.copy(midPoint);

    return cylinder;
}

function f_create_capped_solid_tube(a_o_points, n_radius = 0.5, material) {
    const tube = f_create_solid_tube(a_o_points, n_radius);
    
    // Create end caps
    const capGeometry = new THREE.CircleGeometry(n_radius, 32);
    
    // Start cap
    const startCap = new THREE.Mesh(capGeometry, material);
    startCap.position.copy(a_o_points[0]);
    startCap.lookAt(a_o_points[1]);
    startCap.rotation.x = Math.PI / 2; // Rotate to face the path
    
    // End cap
    const endCap = new THREE.Mesh(capGeometry, material);
    endCap.position.copy(a_o_points[a_o_points.length - 1]);
    endCap.lookAt(a_o_points[a_o_points.length - 2]);
    endCap.rotation.x = Math.PI / 2;
    
    // Combine into a single mesh
    const group = new THREE.Group();
    group.add(new THREE.Mesh(tube, material));
    group.add(startCap);
    group.add(endCap);
    
    return group;
}
// Creates a tube along a path (for lines/polygon edges)
function f_create_tube(a_o_points, n_radius = 0.5, n_segments = 8) {
    const a_points = a_o_points.map(o => new THREE.Vector3(o.n_trn_x, o.n_trn_y, 0));
    const o_curve = new THREE.CatmullRomCurve3(a_points);
    return new THREE.TubeGeometry(o_curve, 20, n_radius, n_segments, false);
}

function createThickLine(scene, points, thickness) {
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const geometry = new THREE.BufferGeometry();
    
    const p1 = new THREE.Vector2(points[0].x, points[0].y);
    const p2 = new THREE.Vector2(points[1].x, points[1].y);
    
    // Compute perpendicular vector
    const direction = new THREE.Vector2().subVectors(p2, p1).normalize();
    const perpendicular = new THREE.Vector2(-direction.y, direction.x).multiplyScalar(thickness / 2);
    
    // Define four corner points
    const v1 = new THREE.Vector3(p1.x + perpendicular.x, p1.y + perpendicular.y, 0);
    const v2 = new THREE.Vector3(p1.x - perpendicular.x, p1.y - perpendicular.y, 0);
    const v3 = new THREE.Vector3(p2.x + perpendicular.x, p2.y + perpendicular.y, 0);
    const v4 = new THREE.Vector3(p2.x - perpendicular.x, p2.y - perpendicular.y, 0);
    
    // Define vertices and indices
    const vertices = new Float32Array([
        v1.x, v1.y, v1.z,
        v2.x, v2.y, v2.z,
        v3.x, v3.y, v3.z,
        v4.x, v4.y, v4.z
    ]);
    
    const indices = [0, 1, 2, 1, 3, 2];
    
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    
    const mesh = new THREE.Mesh(geometry, material);
    if (!geometry.attributes.position || geometry.attributes.position.count === 0) {
        console.error("Invalid geometry: no vertices found");
        return;
    }
    scene.add(mesh);
    return mesh;
}

// Creates a torus (for circles)
function f_create_torus(o_center, n_radius, n_thickness = 0.5, n_segments = 32, material) {
    const o_geometry = new THREE.TorusGeometry(n_radius, n_thickness, n_segments, 32);
    const o_mesh = new THREE.Mesh(o_geometry, material);
    o_mesh.position.set(o_center.n_trn_x, o_center.n_trn_y, 0);
    return o_mesh;
}
function f_export_stl() {
    const exporter = new STLExporter();
    
    // Option 1: Export all meshes as separate objects in one STL
    let stlString = '';
    scene.traverse((child) => {
        if (child.isMesh) {
            stlString += exporter.parse(child, { binary: false });
        }
    });

    // // Option 2: Merge geometries first (better for single solid)
    // const mergedGeometry = new THREE.BufferGeometry();
    // const meshes = [];
    
    // scene.traverse((child) => {
    //     if (child.isMesh) {
    //         meshes.push(child);
    //     }
    // });

    // if (meshes.length > 0) {
    //     // Apply world transforms and merge
    //     meshes.forEach(mesh => {
    //         mesh.updateMatrixWorld();
    //         const geometry = mesh.geometry.clone();
    //         geometry.applyMatrix4(mesh.matrixWorld);
    //         mergedGeometry.merge(geometry);
    //     });

    //     const mergedMesh = new THREE.Mesh(mergedGeometry);
    //     stlString = exporter.parse(mergedMesh, { binary: false });
    // }

    // Download
    const blob = new Blob([stlString], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'design.stl';
    link.click();
}


function createThreeJSObjects(a_o_items) {
    // Clear existing objects (keep lights)
    scene.children.slice().forEach(child => {
        if (!(child instanceof THREE.Light)) scene.remove(child);
    });

    // Shared material
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x00aaff,
        flatShading: true
    });

    // Center of the scene (similar to SVG)
    const n_trn_x_center = 0;
    const n_trn_y_center = 0;

    a_o_items.forEach(o_item => {
        // Convert coordinates (same as before)
        let o_trn, o_trn2;
        
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


        // Case 1: Line → Tube
        if (o_item.o_trn && o_item.o_trn2) {
            let o_cyl = createCylinderBetweenPoints(o_item.o_trn, o_item.o_trn2, o_state.n_thickness, material);
            scene.add(o_cyl);
        }

        // Case 2: Circle → Torus
        else if (o_item.o_trn && o_item.n_radius && !o_item.n_corners) {
            scene.add(f_create_torus(o_trn, o_item.n_radius, o_state.n_thickness, 32, material));
        }

        // Case 3: Polygon → Tubes for each edge
        else if (o_item.o_trn && o_item.n_radius && o_item.n_corners) {
            const a_vertices = createRegularPolygon(
                o_trn.n_trn_x,
                o_trn.n_trn_y,
                o_item.n_radius,
                o_item.n_corners,
                o_item.n_offset_radians
            );

            // Create tubes between each vertex
            for (let i = 0; i < a_vertices.length - 1; i++) {
                const o_start = { n_trn_x: a_vertices[i].x, n_trn_y: a_vertices[i].y };
                const o_end = { n_trn_x: a_vertices[i + 1].x, n_trn_y: a_vertices[i + 1].y };
                let o_cyl = createCylinderBetweenPoints(o_start, o_end, o_state.n_thickness, material);
                scene.add(o_cyl);
                
                // const o_geometry = createThickLine(scene,[o_start, o_end], o_state.n_thickness);
                // scene.add(new THREE.Mesh(o_geometry, material));
            }
        }
    });

    fitCameraToObject(camera, scene, renderer);
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
            // add three line here... if multiple lines are connected a tubemesh could be used?
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
            // add three circle here 
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
            // add three polyline here

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

    createThreeJSObjects(a_o_items);

}
function fitCameraToObject(camera, scene, renderer) {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // Find the maximum dimension
    const maxDim = Math.max(size.x, size.y);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));
    
    // Add some padding
    cameraZ *= 1.5;
    
    camera.position.z = cameraZ;
    camera.position.x = center.x;
    camera.position.y = center.y;
    
    camera.lookAt(center);
    
    // Update controls if they exist
    if (controls) {
        controls.target.copy(center);
        controls.update();
    }
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


let f_update_rendering = function(){
    console.log('Content changed:', o_monaco_editor.getValue());
    let s = o_monaco_editor.getValue();
    let s_f = `(${s})()`;
    console.log(s_f)  
    let a_o = eval(s_f);

    console.log(a_o)
    drawObjectsToDXFAndSVG(a_o)
}
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
        f_update_rendering();

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

// let a_o_test = f_a_o();
// console.log(a_o_test)
// drawObjectsToDXFAndSVG(a_o_test);
// const blob = new Blob([o_dxf.stringify()], { type: "application/dxf" });
// const link = document.createElement("a");
// link.href = URL.createObjectURL(blob);
// link.download = `atest.dxf`;
// link.click();

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111); // Dark background for contrast

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio 1 for square canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500);
document.querySelector('#canvas')?.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Clean up invalid objects
    scene.traverse(child => {
        if (child.isMesh && !child.geometry) {
            scene.remove(child);
        }
    });

    if (scene && camera && renderer) {
        renderer.render(scene, camera);
    }
    controls.update();
    renderer.render(scene, camera);
}
animate();