import { makeObservable } from 'mobx';
import LabelingStore from '../modules/Labeling/LabelingStore';
import FeatureTableStore from '../modules/FeatureTable/FeatureTableStore';
import LayerListStore from '../modules/LayerList/LayerListStore';
import AppStore from './AppStore';
import MainStore from './Main/MainStore';
import MapStore from './Map/MapStore';
import ResizableStore from './Resizable/ResizableStore';
import EditStore from '../modules/Editing/EditStore';
import FilterStore from '../modules/Filter/FilterStore';
import LiveCalcStore from '../modules/LiveCalc/LiveCalcStore';
import SelectStore from '../modules/Select/SelectStore';
import MeasurementStore from '../modules/Measurement/MeasurementStore';
import PrintStore from '../modules/Print/PrintStore';
import ReportPrintStore from '../modules/Print/ReportPrint/ReportPrintStore';
import StandardPrintStore from '../modules/Print/StandardPrint/StandardPrintStore';
import CoordinateStore from '../modules/Coordinate/CoordinateStore';
import HistroyStore from '../modules/History/HistoryStore';
import ClassificationStore from '../modules/Classification/ClassificationStore';
import BookmarkStore from '../modules/Bookmark/BookmarkStore';
import DirectionsStore from '../modules/Directions/DirectionsStore';
import RingCalcStore from '../modules/RingCalc/RingCalcStore';
import NearmeStore from '../modules/Nearme/NearmeStore';
import PopupStore from './Popup/PopupStore';
import EZGCreateStore from '../modules/EZG/EZGCreate/EZGCreateStore';
import OfferRegistrationStore from '../modules/OfferRegistration/OfferRegistrationStore';
import PolygonProcessingStore from '../modules/PolygonProcessing/PolygonProcessingStore';
import EZGReportStore from '../modules/EZG/EZGReport/EZGReportStore';
import SupplierAnalysisStore from '../modules/SupplierAnalysis/SupplierAnalysisStore';
import AreaCompositionStore from '../modules/AreaComposition/AreaCompositionStore';
import UserMenuStore from '../modules/UserMenu/UserMenuStore';

export interface IStores {
    mainStore: MainStore;
    appStore: AppStore;
    resizableStore: ResizableStore;
    mapStore: MapStore;
    layerListStore: LayerListStore;
    labelingStore: LabelingStore;
    polygonProcessingStore: PolygonProcessingStore
    featureTableStore: FeatureTableStore;
    editStore: EditStore;
    filterStore: FilterStore;
    liveCalcStore: LiveCalcStore;
    selectStore: SelectStore;
    measurementStore: MeasurementStore;
    printStore: PrintStore;
    reportPrintStore: ReportPrintStore;
    standardPrintStore: StandardPrintStore;
    coordinateStore: CoordinateStore;
    historyStore: HistroyStore;
    classificationStore: ClassificationStore;
    bookmarkStore: BookmarkStore;
    directionsStore: DirectionsStore;
    ringCalcStore: RingCalcStore;
    nearmeStore: NearmeStore;
    popupStore: PopupStore;
    ezgcreateStore: EZGCreateStore;
    offerRegistrationStore: OfferRegistrationStore;
    ezgreportStore: EZGReportStore;
    supplierAnalysisStore: SupplierAnalysisStore;
    marktAnalysisStore: SupplierAnalysisStore;
    areaCompositionStore: AreaCompositionStore;
    userMenuStore: UserMenuStore;
}

export class Stores implements IStores {
    mainStore: MainStore;
    appStore: AppStore;
    resizableStore: ResizableStore;
    mapStore: MapStore;
    layerListStore: LayerListStore;
    labelingStore: LabelingStore;
    polygonProcessingStore: PolygonProcessingStore;
    featureTableStore: FeatureTableStore;
    editStore: EditStore;
    filterStore: FilterStore;
    liveCalcStore: LiveCalcStore;
    selectStore: SelectStore;
    measurementStore: MeasurementStore;
    printStore: PrintStore;
    reportPrintStore: ReportPrintStore;
    standardPrintStore: StandardPrintStore;
    coordinateStore: CoordinateStore;
    historyStore: HistroyStore;
    classificationStore: ClassificationStore;
    bookmarkStore: BookmarkStore;
    directionsStore: DirectionsStore;
    ringCalcStore: RingCalcStore;
    nearmeStore: NearmeStore;
    popupStore: PopupStore;
    ezgcreateStore: EZGCreateStore;
    offerRegistrationStore: OfferRegistrationStore;
    ezgreportStore: EZGReportStore;
    supplierAnalysisStore: SupplierAnalysisStore;
    marktAnalysisStore: SupplierAnalysisStore;
    areaCompositionStore: AreaCompositionStore;
    userMenuStore: UserMenuStore;

    static instance: IStores;

    // Singleton pattern: getInstance and private constructor
    static getInstance(): IStores {
        if (Stores.instance === undefined) {
            Stores.instance = new Stores();
        }
        return Stores.instance;
    }

    private constructor() {
        makeObservable(this, {});

        // initialize all stores in correct order
        this.appStore = new AppStore();
        this.mainStore = new MainStore();
        this.resizableStore = new ResizableStore(this.appStore);
        this.mapStore = new MapStore(this.appStore);
        this.labelingStore = new LabelingStore();
        this.polygonProcessingStore = new PolygonProcessingStore();
        this.layerListStore = new LayerListStore();
        this.featureTableStore = new FeatureTableStore();
        this.editStore = new EditStore(this.appStore);
        this.filterStore = new FilterStore();
        this.liveCalcStore = new LiveCalcStore();
        this.selectStore = new SelectStore();
        this.measurementStore = new MeasurementStore();
        this.printStore = new PrintStore();
        this.reportPrintStore = new ReportPrintStore();
        this.standardPrintStore = new StandardPrintStore();
        this.coordinateStore = new CoordinateStore();
        this.historyStore = new HistroyStore();
        this.classificationStore = new ClassificationStore();
        this.bookmarkStore = new BookmarkStore();
        this.directionsStore = new DirectionsStore();
        this.ringCalcStore = new RingCalcStore();
        this.nearmeStore = new NearmeStore();
        this.popupStore = new PopupStore();
        this.ezgcreateStore = new EZGCreateStore();
        this.offerRegistrationStore = new OfferRegistrationStore();
        this.ezgreportStore = new EZGReportStore();
        this.supplierAnalysisStore = new SupplierAnalysisStore('supplierAnalysis');
        this.marktAnalysisStore = new SupplierAnalysisStore('marktAnalysis');
        this.areaCompositionStore = new AreaCompositionStore();
        this.userMenuStore = new UserMenuStore();
    }
}
