import {useFrame, useLoader} from '@react-three/fiber';
import {MeshBasicMaterial, MeshStandardMaterial} from 'three'; // Import the MeshBasicMaterial from Three.js

import {useRef} from 'react';
import {Suspense} from "react"
import {Environment, OrbitControls} from "@react-three/drei"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"


export default function NavLogo() {
    const NavModel = () => {
        const gltf = useLoader(GLTFLoader, "/finalLogo.glb");


        const meshRef = useRef(null);

        useFrame(() => {
            if (!meshRef.current) {
                return;
            }
            meshRef.current.rotation.y += 0.02;
        });

        // Add the glassy material properties here
        const glassyMaterial = new MeshStandardMaterial({
            color: '#1dcbcb', // Set the color you want for the glassy effect
            metalness: 1, // Add more metallic look for a mirror effect
            roughness: 0.1, // Adjust the roughness for a smoother appearance
            envMapIntensity: 1.5, // Adjust the intensity of environment reflection
            clearcoat: 1, // Adjust the clearcoat for a polished look
            clearcoatRoughness: 0.1, // Adjust the roughness of the clearcoat
        });


        // Traverse through the children of the gltf.scene to apply the glassy material to all meshes
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = glassyMaterial;
            }
        });

        return (
            <>
                <primitive object={gltf.scene} scale={0.3} ref={meshRef}/>
            </>
        );
    };

    return (
        <>
            <ambientLight intensity={0.7}/>
            <spotLight intensity={1} angle={0.1} penumbra={1} position={[10, 15, 5]}/>
            <NavModel/>
            <Environment preset="city"/>
            <OrbitControls enableZoom={false}/>
        </>
    )
}