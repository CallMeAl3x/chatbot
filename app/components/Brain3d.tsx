"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Brain3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Initialiser la scène
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xadd8e6); // Couleur de fond (bleu clair)

    // Initialiser la caméra
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = -5;

    // Initialiser le rendu
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Ajouter des contrôles OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 20;

    // Ajouter de la lumière
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Charger le modèle GLB
    const loader = new GLTFLoader();
    loader.load(
      "/assets/brain.glb",
      (gltf) => {
        const object = gltf.scene;

        const brainParts = ["Brain_Part_02_BRAIN_TEXTURE_blinn2_0"];

        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            const isBrainParts = brainParts.includes(mesh.name);
            
            const pointsGeometry = mesh.geometry;
            
            const pointsMaterial = new THREE.PointsMaterial({
              color: isBrainParts ? 0xff0000 : 0xffffff,
              size: 0.001,
              sizeAttenuation: true,
              transparent: true,
              opacity: 0.8,
            });
            
            // Créer un système de points
            const points = new THREE.Points(pointsGeometry, pointsMaterial);
            points.position.y = -0.5;
            scene.add(points);
          }
        });

        // scene.add(object);
      },
      (xhr) => {
        console.log(`Chargement : ${(xhr.loaded / xhr.total) * 100}% terminé`);
      },
      (error) => {
        console.error("Erreur lors du chargement du modèle :", error);
      }
    );

    // Fonction d'animation
    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Nettoyage
    return () => {
      currentMount.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Brain3D;
