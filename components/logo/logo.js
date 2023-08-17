import {useFrame, useLoader} from '@react-three/fiber';
import {MeshBasicMaterial, MeshStandardMaterial} from 'three'; // Import the MeshBasicMaterial from Three.js

import {useRef} from 'react';
import {Suspense} from "react"
import {Environment, OrbitControls, Shadow} from "@react-three/drei"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"


export default function Logo() {
    const Model = () => {
        const gltf = useLoader(GLTFLoader, "/logos/NoTexture.glb");

        const meshRef = useRef(null);


        useFrame(() => {
            if (!meshRef.current) {
                return;
            }
            meshRef.current.rotation.y += 0.005;
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
                <primitive object={gltf.scene} scale={0.04} ref={meshRef}/>
            </>
        );
    };

    return (
        <>
            <ambientLight intensity={0}/>
            <directionalLight
                castShadow
                position={[5, 10, 5]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <Suspense fallback={null}>
                <Model/>
                <Environment preset="dawn"/>
            </Suspense>
            <OrbitControls/>
        </>
    )
}