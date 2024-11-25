// Aqui serão colocadas as variaveis que asmazenarm as chaves identificadoras
//  necessárias à Classe Phaser.Tileset usadas no Jogo


const mapMain_key = "mapMain_key"
const mapMain_URL = "Assets/map/mapaMain.json"

const mapL1_key = 'mapLv1_key'
const mapL1_URL = "Assets/map/fase_1_map_full.json"

const objectsLayers_keys = { // GENERAL
    WallLayerKey: "walls", //Levels
    MapaMainLayer_obj1: "obj1", // MapaMain
}

const mapMain_tilesetObjConfig = [ // MapaMain

    {
        key: 'comple1',
        url: 'Assets/tilesets/comple1.png',
        name: 'comple1'
    },
    {
        key: 'comple2',
        url: 'Assets/tilesets/comple2.png',
        name: 'comple2'
    },
    {
        key: 'comple3',
        url: 'Assets/tilesets/comple3.png',
        name: 'comple3'
    },
    {
        key: 'set1_1',
        url: 'Assets/tilesets/set1_1.png',
        name: 'set1_1'
    },
    {
        key: 'set1_2',
        url: 'Assets/tilesets/set1_2.png',
        name: 'set1_2'
    },
    {
        key:'set2',
        url: 'Assets/tilesets/set2.png',
        name: 'set2'
    },
    {
        key: 'set3',
        url: 'Assets/tilesets/set3.png',
        name: 'set3'
    },
    {
        key: 'set4',
        url: 'Assets/tilesets/set4.png',
        name: 'set4'
    },
    {
        key: 'trees',
        url: 'Assets/tilesets/trees.png',
        name: 'trees'
    },
]

 const l1_tilesetObjConfig = [
    {
        key: 'comple1',
        url: 'Assets/tilesets/comple1.png',
        name: 'comple1'
    },
    {
        key: 'comple3',
        url: 'Assets/tilesets/comple3.png',
        name: 'comple3'
    },
    {
        key: 'set1_1',
        url: 'Assets/tilesets/set1_1.png',
        name: 'set1_1'
    },
    {
        key: 'set1_2',
        url: 'Assets/tilesets/set1_2.png',
        name: 'set1_2'
    },
    {
        key:'set2',
        url: 'Assets/tilesets/set2.png',
        name: 'set2'
    },
    {
        key:'set4',
        url: 'Assets/tilesets/set4.png',
        name: 'set4'
    },
    {
        key: 'trees',
        url: 'Assets/tilesets/trees.png',
        name: 'trees'
    }
]

const mapMainLayers_ID = {
    layer1: 'ground',
    layer2: 'levels',
    layer3: 'trunks_roots',
    layer4: 'train',
    layer5: 'floor1',
    layer6: 'fence',
    layer7: 'vegetation_f1',
    layer8: 'floor2',
    layer9: 'tree_tops_1',
    layer10: 'shadows_f2',
    layer11: 'vegetation_f2',
    layer12: 'building_f2'
}


const l1_layers_ID = {
    layer1: 'ground',
    layer2: 'terrain',
    layer3: 'train',
    layer4: 'veg',
    layer5: 'greatTrees_1',
    layer6: 'greatTrees_2',
}

const chuncksData = [
    {
        key: 'chunk_0_0',
        url: `Assets/map/chunk/level1/chunk_0_0.json`
    },
    {
        key: 'chunk_0_1',
        url: `Assets/map/chunk/level1/chunk_0_1.json`
    },
    {
        key: 'chunk_0_2',
        url: `Assets/map/chunk/level1/chunk_0_2.json`
    },
    {
        key: 'chunk_0_3',
        url: `Assets/map/chunk/level1/chunk_0_3.json`
    },
    {
        key: 'chunk_0_4',
        url: `Assets/map/chunk/level1/chunk_0_4.json`
    },
    {
        key: 'chunk_0_5',
        url: `Assets/map/chunk/level1/chunk_0_5.json`
    },
    {
        key: 'chunk_0_6',
        url: `Assets/map/chunk/level1/chunk_0_6.json`
    },
    {
        key: 'chunk_0_7',
        url: `Assets/map/chunk/level1/chunk_0_7.json`
    },
    {
        key: 'chunk_0_8',
        url: `Assets/map/chunk/level1/chunk_0_8.json`
    },
    {
        key: 'chunk_0_9',
        url: `Assets/map/chunk/level1/chunk_0_9.json`
    },
    {
        key: 'chunk_0_10',
        url: `Assets/map/chunk/level1/chunk_0_10.json`
    },
    {
        key: 'chunk_0_11',
        url: `Assets/map/chunk/level1/chunk_0_11.json`
    },
    /*{
        key: 'chunk_0_12',
        url: `Assets/map/chunk/level1/chunk_0_12.json`
    },
    {
        key: 'chunk_0_13',
        url: `Assets/map/chunk/level1/chunk_0_13.json`
    },
    {
        key: 'chunk_0_14',
        url: `Assets/map/chunk/level1/chunk_0_14.json`
    },
    {
        key: 'chunk_0_15',
        url: `Assets/map/chunk/level1/chunk_0_15.json`
    },
    {
        key: 'chunk_0_16',
        url: `Assets/map/chunk/level1/chunk_0_16.json`
    },
    {
        key: 'chunk_0_17',
        url: `Assets/map/chunk/level1/chunk_0_17.json`
    },
    {
        key: 'chunk_0_18',
        url: `Assets/map/chunk/level1/chunk_0_18.json`
    },
    {
        key: 'chunk_0_19',
        url: `Assets/map/chunk/level1/chunk_0_19.json`
    },
    {
        key: 'chunk_0_20',
        url: `Assets/map/chunk/level1/chunk_0_20.json`
    },
    {
        key: 'chunk_0_21',
        url: `Assets/map/chunk/level1/chunk_0_21.json`
    },
    {
        key: 'chunk_0_22',
        url: `Assets/map/chunk/level1/chunk_0_22.json`
    },
    {
        key: 'chunk_0_23',
        url: `Assets/map/chunk/level1/chunk_0_23.json`
    },
    {
        key: 'chunk_1_0',
        url: `Assets/map/chunk/level1/chunk_1_0.json`
    },
    {
        key: 'chunk_1_1',
        url: `Assets/map/chunk/level1/chunk_1_1.json`
    },
    {
        key: 'chunk_1_2',
        url: `Assets/map/chunk/level1/chunk_1_2.json`
    },
    {
        key: 'chunk_1_3',
        url: `Assets/map/chunk/level1/chunk_1_3.json`
    },
    {
        key: 'chunk_1_4',
        url: `Assets/map/chunk/level1/chunk_1_4.json`
    },
    {
        key: 'chunk_1_5',
        url: `Assets/map/chunk/level1/chunk_1_5.json`
    },
    {
        key: 'chunk_1_6',
        url: `Assets/map/chunk/level1/chunk_1_6.json`
    },
    {
        key: 'chunk_1_7',
        url: `Assets/map/chunk/level1/chunk_1_7.json`
    },
    {
        key: 'chunk_1_8',
        url: `Assets/map/chunk/level1/chunk_1_8.json`
    },
    {
        key: 'chunk_1_9',
        url: `Assets/map/chunk/level1/chunk_1_9.json`
    },
    {
        key: 'chunk_1_10',
        url: `Assets/map/chunk/level1/chunk_1_10.json`
    },
    {
        key: 'chunk_1_11',
        url: `Assets/map/chunk/level1/chunk_1_11.json`
    },
    {
        key: 'chunk_1_12',
        url: `Assets/map/chunk/level1/chunk_1_12.json`
    },
    {
        key: 'chunk_1_13',
        url: `Assets/map/chunk/level1/chunk_1_13.json`
    },
    {
        key: 'chunk_1_14',
        url: `Assets/map/chunk/level1/chunk_1_14.json`
    },
    {
        key: 'chunk_1_15',
        url: `Assets/map/chunk/level1/chunk_1_15.json`
    },
    {
        key: 'chunk_1_16',
        url: `Assets/map/chunk/level1/chunk_1_16.json`
    },
    {
        key: 'chunk_1_17',
        url: `Assets/map/chunk/level1/chunk_1_17.json`
    },
    {
        key: 'chunk_1_18',
        url: `Assets/map/chunk/level1/chunk_1_18.json`
    },
    {
        key: 'chunk_1_19',
        url: `Assets/map/chunk/level1/chunk_1_19.json`
    },
    {
        key: 'chunk_1_20',
        url: `Assets/map/chunk/level1/chunk_1_20.json`
    },
    {
        key: 'chunk_1_21',
        url: `Assets/map/chunk/level1/chunk_1_21.json`
    },
    {
        key: 'chunk_1_22',
        url: `Assets/map/chunk/level1/chunk_1_22.json`
    },
    {
        key: 'chunk_1_23',
        url: `Assets/map/chunk/level1/chunk_1_23.json`
    },*/
]

export {
    mapL1_key, //OK
    mapL1_URL, // ok
    mapMain_key,
    mapMain_URL,

    mapMainLayers_ID,
    objectsLayers_keys,
    l1_layers_ID,
    mapMain_tilesetObjConfig,
    l1_tilesetObjConfig, // OK
    chuncksData
}