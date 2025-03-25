
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@2.0.0/mod.js"

import {
    f_o_html_from_o_js,
    f_o_proxified_and_add_listeners
} from "https://deno.land/x/handyhelpers@5.2.3/mod.js"

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
let f_ov = function(ov){
    let a_s = Object.keys(o_state.ov);
    let s_prop_not_reduntant = Object.keys(ov).find(s=>{
        return !a_s.includes(s)
    });
    if(s_prop_not_reduntant){
        o_state.n_ts_ov_changed = new Date().getTime();
        for(let s_prop in ov){
            o_state.ov[s_prop] = ov[s_prop]
        }
    }
    // o_state.ov = ov;
    return o_state.ov;
}

let o_div = document;
let o_state = f_o_proxified_and_add_listeners(
    {
        n_ts_ov_changed: false, 
        ov: {},
        b_add_circle_caps: true,
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
                
                    let ov = f_ov({
                        n_its: {n_min: 3, n_max: 100, n: 20},
                        n_amp: 20,
                    });
                    let n_tau = Math.PI*2;
                    return [
                        ...new Array(ov.n_its.n).fill(0).map(
                            (n, n_idx)=>{
                                let n_it_nor = parseFloat(n_idx)/ov.n_its.n;
                                return f_o_line(f_o_vec2(0,0), f_o_vec2(
                                    Math.sin(n_tau*n_it_nor)*ov.n_amp,
                                    Math.cos(n_tau*n_it_nor)*ov.n_amp,
                                ))
                            }
                        )
                    ]
                }`
            },
            {
                s_name: 'seed_of_life',
                s_function: `function() {
                    let f_o_vec2 = function (n_trn_x, n_trn_y) { return { n_trn_x, n_trn_y } }
                    let f_o_line = function (o_trn, o_trn2) { return { o_trn, o_trn2 } }
                    let f_o_circle = function (o_trn, n_radius) { return { o_trn, n_radius } }
                    let f_o_reg_poly = function (o_trn, n_radius, n_corners, n_offset_radians) { return { o_trn, n_radius, n_corners, n_offset_radians } }
                
                
                    let a_o = [];
                    let n_its = 6.;
                    let n_tau = Math.PI * 2;
                    let n_radius = 20.;
                    for (let n_it = 0; n_it <= n_its; n_it += 1) {
                        let n_it_nor = n_it / n_its;
                        console.log({ n_it_nor })
                        let n_amp = 20

                        a_o.push(
                            f_o_circle(
                                f_o_vec2(
                                    Math.sin(n_tau*n_it_nor)*n_amp, 
                                    Math.cos(n_tau*n_it_nor)*n_amp
                                ),
                                n_radius
                            )
                        )
                
                    }
                    a_o.push(
                        f_o_circle(
                                f_o_vec2(
                                    0,0
                                ),
                                n_radius
                            )
                    )
                    return a_o
                
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
                            }, 
                            {
                                f_a_o: ()=>{
                                    let a_s_prop = Object.keys(o_state.ov);
                                    return a_s_prop.map(s_prop=>{
                                        let v = o_state.ov[s_prop];
                                        if(v.n_min)
                                        return {
                                            f_a_o: ()=>{
                                                return [
                                                    {
                                                        f_s_innerText: ()=>s_prop
                                                    },
                                                    (v.n_min) ? {
                                                        s_tag: 'input', 
                                                        type: 'range',
                                                        a_s_prop_sync: `ov.${s_prop}.n`,
                                                        min: v?.n_min,
                                                        max: v?.n_max, 
                                                        oninput: ()=>{
                                                            f_update_rendering();
                                                        }
                                                    }: {
                                                        s_tag: 'input', 
                                                        type:  'number',
                                                        a_s_prop_sync: `ov.${s_prop}}`,
                                                        oninput: ()=>{
                                                            f_update_rendering();
                                                        }
                                                    }
                                                    
                                                ]
                                            }
                                            
                                        }
                                    })
                                },
                                a_s_prop_sync: 'n_ts_ov_changed'
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


function f_o_sphere_cap(point, radius, material) {
    const sphereGeometry = new THREE.SphereGeometry(radius, 16, 16);
    const sphere = new THREE.Mesh(sphereGeometry, material);

    // Position the sphere at the given point
    sphere.position.set(point.n_trn_x, point.n_trn_y, 0);

    return sphere;
}

function f_a_o_cylinder_and_spheres_between_points(point1, point2, radius, material) {
    const p1 = new THREE.Vector3(point1.n_trn_x, point1.n_trn_y, 0);
    const p2 = new THREE.Vector3(point2.n_trn_x, point2.n_trn_y, 0);

    // Compute direction and length
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();

    if (length <= 0) {
        console.warn("Skipping zero-length cylinder.");
        return []; // Return empty array to avoid errors
    }

    // Calculate midpoint
    const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

    // Create cylinder geometry
    const geometry = new THREE.CylinderGeometry(radius, radius, length, 16);
    const cylinder = new THREE.Mesh(geometry, material);

    // Align cylinder with the direction
    cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

    // Position at midpoint
    cylinder.position.copy(midPoint);


    return [
        cylinder, 
        ...(o_state.b_add_circle_caps ? [
            f_o_sphere_cap(point1, radius, material),
            f_o_sphere_cap(point2, radius, material)
        ] : [])
    ];
}

function f_o_mesh_torus(o_center, n_radius, n_thickness = 0.5, n_segments = 32, material) {
    const o_geometry = new THREE.TorusGeometry(n_radius, n_thickness, n_segments, 32);
    const o_mesh = new THREE.Mesh(o_geometry, material);
    o_mesh.position.set(o_center.n_trn_x, o_center.n_trn_y, 0);
    return o_mesh;
}

function f_export_stl() {
    const o_exporter = new STLExporter();
    
    // Option 1: Export all meshes as separate objects in one STL
    let s_stl = '';
    o_scene.traverse((o_child) => {
        if (o_child.isMesh) {
            s_stl += o_exporter.parse(o_child, { binary: false });
        }
    });

    // Download
    const o_blob = new Blob([s_stl], { type: 'text/plain' });
    const o_el_a = document.createElement('a');
    o_el_a.href = URL.createObjectURL(o_blob);
    o_el_a.download = `${o_state.s_name}.stl`;
    o_el_a.click();
}


function createThreeJSObjects(a_o_items) {
    // Clear existing objects (keep lights)
    o_scene.children.slice().forEach(o_child => {
        if (!(o_child instanceof THREE.Light)) o_scene.remove(o_child);
    });

    // Shared material
    const o_material = new THREE.MeshPhongMaterial({ 
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
            let a_o = f_a_o_cylinder_and_spheres_between_points(o_item.o_trn, o_item.o_trn2, o_state.n_thickness, o_material);
            a_o.forEach((o)=>{
                o_scene.add(o)
            });
        }

        // Case 2: Circle → Torus
        else if (o_item.o_trn && o_item.n_radius && !o_item.n_corners) {
            o_scene.add(f_o_mesh_torus(o_trn, o_item.n_radius, o_state.n_thickness, 32, o_material));
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
                let a_o = f_a_o_cylinder_and_spheres_between_points(o_start, o_end, o_state.n_thickness, o_material);
            
                
                a_o.forEach((o)=>{
                    o_scene.add(o)
                });
            }
        }
    });

    f_fit_camera_to_object(o_camera, o_scene, o_renderer);
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
function f_fit_camera_to_object(o_camera, o_scene) {
    const box = new THREE.Box3().setFromObject(o_scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // Find the maximum dimension
    const maxDim = Math.max(size.x, size.y);
    const fov = o_camera.fov * (Math.PI / 180);
    let o_cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));
    
    // Add some padding
    o_cameraZ *= 1.5;
    
    o_camera.position.z = o_cameraZ;
    o_camera.position.x = center.x;
    o_camera.position.y = center.y;
    
    o_camera.lookAt(center);
    
    // Update controls if they exist
    if (o_controls) {
        o_controls.target.copy(center);
        o_controls.update();
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
const o_scene = new THREE.Scene();
globalThis.o_scene = o_scene
o_scene.background = new THREE.Color(0x111111); // Dark background for contrast

const o_camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio 1 for square canvas
const o_renderer = new THREE.WebGLRenderer({ antialias: true });
o_renderer.setSize(500, 500);
document.querySelector('#canvas')?.appendChild(o_renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
o_scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
o_scene.add(directionalLight);

// Add orbit controls
const o_controls = new OrbitControls(o_camera, o_renderer.domElement);
o_controls.enableDamping = true;
o_controls.dampingFactor = 0.25;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Clean up invalid objects
    o_scene.traverse(o_child => {
        if (o_child.isMesh && !o_child.geometry) {
            o_scene.remove(o_child);
        }
    });

    if (o_scene && o_camera && o_renderer) {
        o_renderer.render(o_scene, o_camera);
    }
    o_controls.update();
    o_renderer.render(o_scene, o_camera);
}
animate();