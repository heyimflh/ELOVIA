import fs from 'fs';
import path from 'path';

// Polyfill browser FileReader for Three.js GLTFExporter in Node.js
class NodeFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend({ target: this });
      if (this.onload) this.onload({ target: this });
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      const base64 = Buffer.from(buf).toString('base64');
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
      if (this.onloadend) this.onloadend({ target: this });
      if (this.onload) this.onload({ target: this });
    });
  }
}
globalThis.FileReader = NodeFileReader;

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const exporter = new GLTFExporter();

function exportToGLB(scene, outputPath) {
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (gltf) => {
        const buffer = Buffer.from(gltf);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, buffer);
        console.log(`Exported GLB: ${outputPath} (${buffer.length} bytes)`);
        resolve();
      },
      (error) => reject(error),
      { binary: true }
    );
  });
}

async function main() {
  console.log('Generating GLB models...');

  // 1. Bottle model (/3dModels/items/bottle.glb)
  {
    const group = new THREE.Group();
    group.name = 'RecycledBottle';

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.15,
      metalness: 0.1,
    });
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.2,
    });

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.7, 32), glassMat);
    body.position.y = 0;
    group.add(body);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 0.35, 32), glassMat);
    neck.position.y = 0.5;
    group.add(neck);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 32), capMat);
    cap.position.y = 0.7;
    group.add(cap);

    await exportToGLB(group, 'public/3dModels/items/bottle.glb');
  }

  // 2. Box model (/3dModels/items/box.glb)
  {
    const group = new THREE.Group();
    group.name = 'CardboardBox';

    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.5,
      metalness: 0.05,
    });
    const tapeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.3,
      metalness: 0.1,
    });

    const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.7), boxMat);
    group.add(box);

    const tape = new THREE.Mesh(new THREE.BoxGeometry(0.71, 0.02, 0.2), tapeMat);
    tape.position.y = 0.23;
    group.add(tape);

    await exportToGLB(group, 'public/3dModels/items/box.glb');
  }

  // 3. Trophy model (/3dModels/leaderboard/trophy.glb)
  {
    const group = new THREE.Group();
    group.name = 'EcoLeaderboardTrophy';

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.2,
      metalness: 0.85,
    });
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.3,
      metalness: 0.75,
    });
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
    });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.25, 32), baseMat);
    base.position.y = -0.6;
    group.add(base);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.5, 24), goldMat);
    stem.position.y = -0.25;
    group.add(stem);

    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.2, 0.65, 32), goldMat);
    cup.position.y = 0.3;
    group.add(cup);

    const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.16), starMat);
    star.position.y = 0.72;
    group.add(star);

    await exportToGLB(group, 'public/3dModels/leaderboard/trophy.glb');
  }

  console.log('All 3D models generated successfully.');
}

main().catch(console.error);
