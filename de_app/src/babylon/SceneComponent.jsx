/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {
  FunctionComponent,
  useEffect,
  useCallback,
  useState,
} from 'react';

import { SafeAreaView, View, Button, ViewProps, StatusBar } from 'react-native';

import { EngineView, useEngine } from '@babylonjs/react-native';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Camera } from '@babylonjs/core/Cameras/camera';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Color4, StandardMaterial, PolygonMeshBuilder, Quaternion, Vector2, Color3,MeshBuilder } from '@babylonjs/core'
import '@babylonjs/loaders/glTF';
import { Scene } from '@babylonjs/core/scene';
import { WebXRSessionManager, WebXRTrackingState, WebXRHitTest, WebXRPlaneDetector,WebXRAnchorSystem } from '@babylonjs/core/XR';

const SceneComponent = (props) => {
  const engine = useEngine();
  const [camera, setCamera] = useState();
  const [xrSession, setXrSession] = useState();
  const [trackingState, setTrackingState] = useState();
  const [scene, setScene] = useState();

  const onToggleXr = useCallback(() => {
    (async () => {
      if (xrSession) {
        await xrSession.exitXRAsync();
      } else {
        if (scene !== undefined) {

     

          const xr = await scene.createDefaultXRExperienceAsync({
            disableDefaultUI: true,
            disableTeleportation: true,
            uiOptions: {
              sessionMode: "immersive-ar",
              referenceSpaceType: "local-floor",
            },
            optionalFeatures: true,

          });
          const session = await xr.baseExperience.enterXRAsync(
            'immersive-ar',
            'unbounded',
            xr.renderTarget,

          );
          setXrSession(session);
          session.onXRSessionEnded.add(() => {
            setXrSession(undefined);
            setTrackingState(undefined);
          });

          setTrackingState(xr.baseExperience.camera.trackingState);
          xr.baseExperience.camera.onTrackingStateChanged.add(
            newTrackingState => {
              setTrackingState(newTrackingState);
            },
          );

          // console.log(scene.getMeshById("sofa"))
        




          // var sphere = MeshBuilder.CreateSphere("sphere1", { segments: 16, diameter: 2 }, scene);
          // sphere.position.y = -4;
          // sphere.position.z = 5;


          // const fm = xr.baseExperience.featuresManager;

          // const xrTest = fm.enableFeature(WebXRHitTest, "latest");
      
          // const marker = MeshBuilder.CreateTorus('marker', { diameter: 1, thickness: 0.5 });
          // marker.isVisible = false;
          // marker.rotationQuaternion = new Quaternion();
      
          // xrTest.onHitTestResultObservable.add((results) => {
          //     if (results.length) {
          
          //       // sphere.position =marker.position;
          //       // console.log("sp pos :",marker.position)

          //         marker.isVisible = true;
          //         hitTest = results[0];
          //         hitTest.transformationMatrix.decompose(marker.scaling, marker.rotationQuaternion, marker.position);
          //     } else {
          //         marker.isVisible = false;
          //     }
          // });
      



          // const hitTest = featuresManager.enableFeature(WebXRHitTest, "latest");
          // console.log("hittest",hitTest);

          // const fm = xr.baseExperience.featuresManager;
          // const anchorSystem = fm.enableFeature(WebXRAnchorSystem, "latest", { doNotRemoveAnchorsOnSessionEnded: true });

          
   
          // const planeDetector = fm.enableFeature(WebXRPlaneDetector, "latest");


        //  console.log(fm)

          // const xrPlanes = fm.enableFeature(WebXRPlaneDetector.Name, "latest");

          // const planes = [];
          // console.log(planes)

          // xrPlanes.onPlaneAddedObservable.add(plane => {
          //   plane.polygonDefinition.push(plane.polygonDefinition[0]);
          //   var polygon_triangulation = new PolygonMeshBuilder("name", plane.polygonDefinition.map((p) => new Vector2(p.x, p.z)), scene);
          //   var polygon = polygon_triangulation.build(false, 0.01);
          //   plane.mesh = polygon;
          //   planes[plane.id] = (plane.mesh);
          //   const mat = new StandardMaterial("mat", scene);
          //   mat.alpha = 0.5;
          //   // pick a random color
          //   mat.diffuseColor = Color3.Random();
          //   polygon.createNormals();
          //   plane.mesh.material = mat;

          //   plane.mesh.rotationQuaternion = new Quaternion();
          //   plane.transformationMatrix.decompose(plane.mesh.scaling, plane.mesh.rotationQuaternion, plane.mesh.position);
          // });

          // xrPlanes.onPlaneUpdatedObservable.add(plane => {
          //   let mat;
          //   if (plane.mesh) {
          //     // keep the material, dispose the old polygon
          //     mat = plane.mesh.material;
          //     plane.mesh.dispose(false, false);
          //   }
          //   const some = plane.polygonDefinition.some(p => !p);
          //   if (some) {
          //     return;
          //   }
          //   plane.polygonDefinition.push(plane.polygonDefinition[0]);
          //   var polygon_triangulation = new PolygonMeshBuilder("name", plane.polygonDefinition.map((p) => new Vector2(p.x, p.z)), scene);
          //   var polygon = polygon_triangulation.build(false, 0.01);
          //   polygon.createNormals();
          //   plane.mesh = polygon;
          //   planes[plane.id] = (plane.mesh);
          //   plane.mesh.material = mat;
          //   plane.mesh.rotationQuaternion = new Quaternion();
          //   plane.transformationMatrix.decompose(plane.mesh.scaling, plane.mesh.rotationQuaternion, plane.mesh.position);
          // })

          // xrPlanes.onPlaneRemovedObservable.add(plane => {
          //   if (plane && planes[plane.id]) {
          //     planes[plane.id].dispose()
          //   }
          // })

          // xr.baseExperience.sessionManager.onXRSessionInit.add(() => {
          //   planes.forEach(plane => plane.dispose());
          //   while (planes.pop()) { };
          // });

          // console.log(xrPlanes)


          // const xrTest = fm.enableFeature(WebXRHitTest, "latest");

          // const marker = MeshBuilder.CreateTorus('marker', { diameter: 0.15, thickness: 0.05 });
          // marker.isVisible = false;
          // marker.rotationQuaternion = new Quaternion();
      
          // xrTest.onHitTestResultObservable.add((results) => {
          //     if (results.length) {
          //         marker.isVisible = true;
          //         hitTest = results[0];
          //         hitTest.transformationMatrix.decompose(marker.scaling, marker.rotationQuaternion, marker.position);
          //     } else {
          //         marker.isVisible = false;
          //     }
          // });

          // console.log(xrTest)



        }
      }
    })();
  }, [scene, xrSession]);

  useEffect(() => {
    if (engine) {

      // const loadScene = new Scene(engine);

      const url =
        'https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com/models/sofa_chair.glb';
      SceneLoader.LoadAsync(url, undefined, engine).then(loadScene => {
        setScene(loadScene);
        loadScene.createDefaultCameraOrLight(true, undefined, true);
        (loadScene.activeCamera).alpha += Math.PI;
        (loadScene.activeCamera).radius = 10;
        setCamera(loadScene.activeCamera);
      });
      // setScene(loadScene);
      // loadScene.createDefaultCameraOrLight(true, undefined, true);
      // (loadScene.activeCamera).alpha += Math.PI;
      // (loadScene.activeCamera).radius = 30;
      // setCamera(loadScene.activeCamera);


      console.log("running")


    }
  }, [engine]);

  return (
    <>
      <View style={props.style}>
        <Button
          title={xrSession ? 'Stop AR' : 'Start AR'}
          onPress={onToggleXr}
        />
        <View style={{ flex: 1 }}>
          <EngineView camera={camera} />
        </View>
      </View>
    </>
  );
};


export default SceneComponent;