"use client";

import { useState } from "react";
// industrial-imports
import { SistemaRecursosExplorador, RutasExplorador, HojaCalculoExplorador, FormatoImagenExplorador, SubidaNubeExplorador, TiempoPantallaExplorador } from "@/components/lesson/slide/tools/TecEso2DigitalTools";
import { RequisitosProyectoExplorador, ScamperExplorador, SeleccionIdeasExplorador, GanttProyectoExplorador, PruebasPrototipoExplorador, MemoriaProyectoExplorador } from "@/components/lesson/slide/tools/TecEso2ProyectoTools";
import { DensidadMaterialesExplorador, CurvaTraccionExplorador, DespieceTableroExplorador, MatrizDecisionMaterialesExplorador, TecnicaTallerExplorador, CalibreExplorador, Impresion3dEsoExplorador } from "@/components/lesson/slide/tools/TecEso2MaterialesTools";
import { PiezaVistasExplorador, EscalaConversionExplorador, PerspectivaConicaExplorador, PlanoViviendaExplorador, CadComandosExplorador, SolidoOperacionesExplorador, LaminaExplorador } from "@/components/lesson/slide/tools/TecEso2DibujoTools";
import { TrazaExplorador, TiposDatosExplorador, OperadoresExplorador, FuncionProgramaExplorador, PruebasExplorador, AdivinaExplorador } from "@/components/lesson/slide/tools/TecEso2ProgramacionTools";
import { TensionExplorador, PerfilCantoExplorador, VentajaMecanicaExplorador, TrenTransmisionExplorador, PoleasCorreasCalcExplorador, TransformacionExplorador, ElevadorExplorador } from "@/components/lesson/slide/tools/TecEso2MecanicaTools";
import { AnalogiaAguaExplorador, OhmIncognitaExplorador, FacturaExplorador, SerieParaleloCalcExplorador, MixtoExplorador, PolimetroExplorador, FalloCircuitoExplorador } from "@/components/lesson/slide/tools/TecEso2ElectricidadTools";
import { CadPlacaExplorador, ExtrusionExplorador, DiapositivaLegibleExplorador, ClasificadorIaExplorador, AppEventosExplorador } from "@/components/lesson/slide/tools/TecEso1ComunicacionTools";
import { DispositivoComponentesExplorador, DiagnosticoTecnicoExplorador, CapacidadAlmacenamientoExplorador, CopiaSeguridadExplorador, TiempoDescargaExplorador, BusquedaOperadoresExplorador, ContrasenaFortalezaExplorador, SituacionesDigitalesExplorador, LicenciasCcExplorador } from "@/components/lesson/slide/tools/TecEso1DigitalTools";
import { HuellaProductoExplorador, ConsumoHabitosExplorador, AhorroEnergiaExplorador, TiempoDescomposicionExplorador, LinealCircularEsoExplorador, RampaAccesibilidadExplorador } from "@/components/lesson/slide/tools/TecEso1SostenibleTools";
import { AlgoritmoOrdenaExplorador, ProgramaBloquesExplorador, FlujoSencilloExplorador, VariablesCajasExplorador, CondicionesExplorador, DepuraProgramaExplorador } from "@/components/lesson/slide/tools/TecEso1ComputacionalTools";
import { ConductoresAislantesExplorador, CircuitoSimpleExplorador, SimbolosElectricosExplorador, ControlLuzExplorador, SerieParaleloExplorador, MontajeCircuitoExplorador, SeguridadElectricaExplorador } from "@/components/lesson/slide/tools/TecEso1ElectricidadTools";
import { MovimientosExplorador, PalancaEquilibrioExplorador, PoleasAparejoExplorador, RuedaEjeExplorador, EngranajesEsoExplorador, TrenEngranajesExplorador, BiciMarchasExplorador } from "@/components/lesson/slide/tools/TecEso1MecanismosTools";
import { EsfuerzosBarraExplorador, VigaFlexionExplorador, EstabilidadExplorador, TriangulacionExplorador, PuentesTiposExplorador, EnsayoPuenteExplorador } from "@/components/lesson/slide/tools/TecEso1EstructurasTools";
import { EnsayoMaterialExplorador, PropiedadesBarrasExplorador, MaderaDerivadosExplorador, MetalesPruebaExplorador, PlasticoCalorExplorador, SeleccionMaterialEsoExplorador, TallerPeligrosExplorador, ContenedoresReciclajeExplorador } from "@/components/lesson/slide/tools/TecEso1MaterialesTools";
import { TrazadosBasicosExplorador, AcotacionExplorador, EscalaDibujoExplorador, VistasPiezaExplorador, PerspectivaExplorador } from "@/components/lesson/slide/tools/TecEso1GraficaTools";
import { AnalisisObjetoExplorador, LineaTiempoExplorador, PresupuestoExplorador, RepartoTareasExplorador, FuenteFiableExplorador } from "@/components/lesson/slide/tools/TecEso1ProcesoTools";
import { IndicadoresDecisionExplorador, MapaRecursosExplorador, EdificioEficienciaExplorador, ProductoImpactoExplorador, EconomiaCircularExplorador, ParqueRenovableExplorador, AcvExplorador, GruposAfectadosExplorador } from "@/components/lesson/slide/tools/Tec1SostenibleTools";
import { FabricaModosExplorador, BloquesControlExplorador, SensoresHabitacionExplorador, ActuadoresExplorador, PlacaVirtualExplorador, SenalUmbralExplorador, CompuertasAlarmaExplorador, TermostatoLazoExplorador, LineaClasificacionExplorador, RobotCuadriculaExplorador } from "@/components/lesson/slide/tools/Tec1AutomaticosTools";
import { OrdenadorComponentesExplorador, ProcesosMemoriaExplorador, PermisosArchivosExplorador, TextoBinarioExplorador, TamanoArchivoExplorador, DiagramaFlujoExplorador, PythonTrazaExplorador, TestsAutomaticosExplorador } from "@/components/lesson/slide/tools/Tec1ProgramacionTools";
import { CargaCorrienteExplorador, OhmExplorador, CircuitoBasicoExplorador, ResistenciasExplorador, KirchhoffExplorador, ConsumoEnergiaExplorador, SobrecargaCircuitoExplorador, MultimetroExplorador, DiagnosticoCircuitoExplorador, DiodoLedExplorador, TransistorConmutadorExplorador, CondensadorCargaExplorador, RetoLedExplorador } from "@/components/lesson/slide/tools/Tec1CircuitosTools";
import { MaquinaDesmontajeExplorador, PoleasCorreasExplorador, EngranajesExplorador, BicicletaExplorador, SinFinExplorador, BielaManivelaExplorador, LevaSeguidorExplorador, CremalleraTornilloExplorador, PalancaExplorador, PolipastoExplorador, DiscoGiratorioExplorador, MotorVirtualExplorador, ReductorRendimientoExplorador, TransmisionEditorExplorador } from "@/components/lesson/slide/tools/Tec1MecanismosTools";
import { MesaMuestrasExplorador, EstructuraAtomicaExplorador, PropiedadesComparadorExplorador, CarbonoHierroExplorador, PolimeroTemperaturaExplorador, CompuestoMezclasExplorador, TratamientoCurvaExplorador, ProcesoCosteExplorador, Impresion3dExplorador, ToleranciaCalidadExplorador, FabricaRiesgosExplorador, ReciclajeEnergiaExplorador } from "@/components/lesson/slide/tools/Tec1MaterialesTools";
import { ObjetoProblemaExplorador, MatrizDecisionExplorador, RequisitosExplorador, GanttExplorador, RolesEquipoExplorador, PrototipoEnsayoExplorador, MemoriaTecnicaExplorador } from "@/components/lesson/slide/tools/Tec1ProyectosTools";
import { MediaMuestralExplorador, ProporcionMuestralExplorador, ContrasteMediaExplorador, ContrasteProporcionExplorador } from "@/components/lesson/slide/tools/Ccss2EstimacionTools";
import { ProgramacionLinealExplorador } from "@/components/lesson/slide/tools/CcssProgramacionTools";
import { DistribucionDiscretaExplorador, ChebychevExplorador, DensidadExplorador, IntervaloMediaExplorador } from "@/components/lesson/slide/tools/Bach2ProbTools";
import { IntegralPolinomioExplorador, RiemannExplorador, BarrowExplorador, AreaCurvasExplorador, VolumenRevolucionExplorador, IntegralMetodosExplorador } from "@/components/lesson/slide/tools/Bach2IntegralesTools";
import { UnoInfinitoExplorador, LHopitalExplorador, EstudioFuncionExplorador } from "@/components/lesson/slide/tools/Bach2AnalisisTools";
import { AngulosEspacioExplorador, ProyeccionSimetricoExplorador, DistanciasEspacioExplorador } from "@/components/lesson/slide/tools/Bach2MetricaTools";
import { RectaEspacioExplorador, PlanoEspacioExplorador, PosicionRectasExplorador, PosicionRectaPlanoExplorador, PosicionPlanosExplorador } from "@/components/lesson/slide/tools/Bach2RectasPlanosTools";
import { VectoresPuntosExplorador, VectoresDependenciaExplorador, ProductoEscalar3dExplorador, ProductoVectorialExplorador, ProductoMixtoExplorador } from "@/components/lesson/slide/tools/Bach2VectoresTools";
import { SistemaRoucheExplorador, CramerExplorador, SistemaFamiliaExplorador } from "@/components/lesson/slide/tools/Bach2SistemasTools";
import { DeterminanteAreaExplorador, DeterminantePropiedadesExplorador, DeterminanteProductoExplorador, DeterminanteParametroExplorador, AdjuntaExplorador, RangoMenoresExplorador } from "@/components/lesson/slide/tools/Bach2DeterminantesTools";
import { MatrizOperacionesExplorador, MatrizProductoExplorador, MatrizInversaExplorador, MatrizPotenciasExplorador, GrafoCaminosExplorador, MatrizConmutaExplorador, EcuacionMatricialExplorador } from "@/components/lesson/slide/tools/Bach2MatricesTools";
import { CuantiaExplorador, BinomialExplorador, NormalExplorador, TablaNormalExplorador, BinomialNormalExplorador, IntervaloConfianzaExplorador } from "@/components/lesson/slide/tools/Ccss1DistribTools";
import { PascalExplorador, BinomioExplorador } from "@/components/lesson/slide/tools/Ccss1CombTools";
import { RegresionCuadraticaExplorador } from "@/components/lesson/slide/tools/Ccss1EstadTools";
import { BeneficioExplorador } from "@/components/lesson/slide/tools/Ccss1AnalisisTools";
import { InterpolacionExplorador, DiferenciasExplorador, ParteEnteraExplorador } from "@/components/lesson/slide/tools/Ccss1FuncTools";
import { CapitalizacionExplorador, PrestamoExplorador, TaeExplorador } from "@/components/lesson/slide/tools/Ccss1FinanzasTools";
import { PercentilesExplorador, DobleEntradaExplorador, NubeRegresionExplorador } from "@/components/lesson/slide/tools/Bach1EstadTools";
import { SucesosVennExplorador, ProbUnionExplorador, TablaContingenciaExplorador, ArbolTablaExplorador, ProbTotalExplorador, AzarFamosoExplorador } from "@/components/lesson/slide/tools/Bach1ProbTools";
import { SecanteExplorador, DerivabilidadExplorador, FuncionDerivadaExplorador, ProductoCocienteExplorador, CadenaExplorador, DerivadaInversaExplorador, VelocidadAceleracionExplorador, ExtremosExplorador, OptimizacionExplorador } from "@/components/lesson/slide/tools/Bach1DerivTools";
import { LimiteTablaExplorador, LimiteLateralExplorador, LimiteInfinitoExplorador, AsintotasExplorador, CeroCeroExplorador, LimiteGradosExplorador, ContinuidadKExplorador, OperacionesLimiteExplorador, RestaFraccionesExplorador } from "@/components/lesson/slide/tools/Bach1LimTools";
import { DominioExplorador, SimetriaExplorador, SignoExplorador, FuncionRaizExplorador, ExpLogExplorador, TrigFuncionExplorador, AbsFuncionExplorador, OfertaDemandaExplorador, ComposicionExplorador, InversaExplorador } from "@/components/lesson/slide/tools/Bach1FuncTools";
import { ProductoEscalarExplorador, RectaFormasExplorador, RectasAnguloExplorador, DistanciaPuntoRectaExplorador, MediatrizExplorador, ConicaExplorador } from "@/components/lesson/slide/tools/Bach1GeoTools";
import { RadianesExplorador, CirculoTrigExplorador, AngulosRelacionadosExplorador, SumaAngulosExplorador, DobleMitadExplorador, SumaProductoExplorador, EcuacionTrigExplorador, TrianguloGeneralExplorador } from "@/components/lesson/slide/tools/Bach1TrigTools";
import { SucesionExplorador, ProgresionExplorador, LimiteEpsilonExplorador, LimiteRacionalExplorador, NumeroEExplorador } from "@/components/lesson/slide/tools/Bach1SucesionesTools";
import { EntornoExplorador, ComplejoExplorador, ComplejosOperacionesExplorador, PotenciaComplejaExplorador, RaicesComplejasExplorador, LogaritmoExplorador, LogPropiedadesExplorador, SistemaParametroExplorador, InecuacionCuadraticaExplorador, RegionInecuacionesExplorador } from "@/components/lesson/slide/tools/Bach1Tools";
import { IntervaloExplorador, SistemaInecuacionesExplorador, RuffiniExplorador, FraccionAlgExplorador, TrigExplorador, TrigResolverExplorador, CombinatoriaExplorador } from "@/components/lesson/slide/tools/Eso4bTools";
import { LazoPerturbacionExplorador, SegundoOrdenExplorador, BloquesExplorador, RouthExplorador, PidExplorador } from "@/components/lesson/slide/tools/ControlTools";
import {
  BiestableJkExplorador,
  BiestableRsExplorador,
  CableadoElementosExplorador,
  GrafoBimodalExplorador,
  MotorEnclavamientoExplorador,
  RegistroContadorExplorador,
  SecuenciaRelesExplorador,
  SecuencialMemoriaExplorador,
} from "@/components/lesson/slide/tools/SecuencialTools";
import {
  CuantizacionAdExplorador,
  EncoderRpmExplorador,
  GalgaDeformacionExplorador,
  OperacionalInversorExplorador,
  PotenciometroDivisorExplorador,
  PuentePotenciometrosExplorador,
  SensorCurvaExplorador,
  SensorProximidadExplorador,
  TermorresistenciaPuenteExplorador,
} from "@/components/lesson/slide/tools/SensoresTools";
import {
  BinarioByteExplorador,
  ConversionDecimalBinarioExplorador,
  FormasCanonicasExplorador,
  HexBcdExplorador,
  KarnaughExplorador,
  LogicaNivelesExplorador,
  MorganExplorador,
  MuxDecoderExplorador,
  NandNorExplorador,
  PuertaLogicaExplorador,
  SumadorBinarioExplorador,
} from "@/components/lesson/slide/tools/LogicaTools";
import { PascalPrensaExplorador, ContinuidadBernoulliExplorador, ViscosidadFuerzaExplorador, EnergiaBernoulliExplorador, PotenciaHidraulicaExplorador, PerdidaCargaExplorador, BombaCaudalExplorador, CilindroHidraulicoExplorador, LimitadoraExplorador } from "@/components/lesson/slide/tools/HidraulicaTools";
import { PresionNeumaticaExplorador, CaudalCilindroExplorador, RelacionCompresionExplorador, FuerzaCilindroExplorador, ConsumoAireExplorador, ValvulaNomenclaturaExplorador, LogicaNeumaticaExplorador, VentosaVacioExplorador, NumeracionNeumaticaExplorador } from "@/components/lesson/slide/tools/NeumaticaTools";
import { CampoHiloExplorador, LorentzExplorador, EspiraParExplorador, FemInduccionExplorador, MotorCcExplorador, CurvasCcExplorador, BalanceCcExplorador, ArranqueCcExplorador, VelocidadTrifasicoExplorador, TrifasicoConexionExplorador, CurvaParAsincronoExplorador } from "@/components/lesson/slide/tools/ElectricosTools";
import { CarnotExplorador, BraytonExplorador, OttoDieselExplorador, PotenciaMotorExplorador, CilindradaExplorador, FrigorificaExplorador, MotorTiemposExplorador } from "@/components/lesson/slide/tools/TermicosTools";
import { IsotoposExplorador, CurvaEnlaceExplorador, ElectronegatividadExplorador, CovalenteExplorador, EnlaceFusionGrafica, CeldaExplorador, AlotropiaExplorador } from "@/components/lesson/slide/tools/EstructuraTools";
import { TensionDeformacionExplorador, DiagramaTraccionExplorador, HookeExplorador, TensionTrabajoExplorador, BrinellExplorador, VickersExplorador, RockwellExplorador, CharpyExplorador, FatigaExplorador } from "@/components/lesson/slide/tools/EnsayosTools";
import { ConversorIndustrial, PlanoInclinadoTrabajo, ResorteExplorador, EnergiaRampa, MomentoInercia, EquilibrioTermico, PrimerPrincipio, RendimientoCadena, PotenciaVehiculo, ParTrabajo, DiagramaPV, PotenciaElectricaHidraulica } from "@/components/lesson/slide/tools/MaquinasTools";
import { IntersticioRed, DurezaMartensita, TttExplorador, JominyExplorador, TemperaturasTratamiento, PerfilDureza, PilaElectroquimica, NernstExplorador, FaradayExplorador, RecubrimientoRayado, PillingBedworth } from "@/components/lesson/slide/tools/TratamientosTools";
import { ResistenciaEspecifica, PiezaPesoMinimo, AleacionesFiltro, GrietaGriffith, GradoPolimerizacion, RtpComunidades } from "@/components/lesson/slide/tools/MaterialesTools";
import { AleacionConcentracion, EnergiaFusion, GibbsExplorador, DiagramaBinario, DiagramaEutectico, FeCExplorador, AceroClasificador } from "@/components/lesson/slide/tools/AleacionesTools";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { CompasBisectriz, CompasMediatriz } from "@/components/lesson/slide/tools/CompasTools";
import {
  AnguloExplorador,
  AngulosSuma,
  BisectrizExplorador,
  ParalelasExplorador,
  PoligonoExplorador,
  PuntoMediatriz,
  RectasPosicion,
  Transportador,
  TrianguloExplorador,
} from "@/components/lesson/slide/tools/GeometryTools";
import {
  CircCircExplorador,
  CircRectaExplorador,
  ParalelogramoExplorador,
  PoligonoRegularExplorador,
  TrianguloCentros,
  TrianguloClasificador,
} from "@/components/lesson/slide/tools/FigurasTools";
import { CirculoExplorador, ParalelogramoArea, PoligonoRegularArea, RectanguloExplorador, TrapecioArea, TrianguloArea } from "@/components/lesson/slide/tools/AreaTools";
import { DatosExplorador, PlanoExplorador, SectoresExplorador } from "@/components/lesson/slide/tools/DatosTools";
import { DadoSimulador, LaplaceExplorador } from "@/components/lesson/slide/tools/ProbTools";
import { PoliedroExplorador } from "@/components/lesson/slide/tools/SolidTools";
import { FractionProductTool } from "@/components/lesson/slide/tools/FractionProductTool";
import { DosDadosExplorador, IndependientesExplorador, UrnaArbolExplorador } from "@/components/lesson/slide/tools/ProbabilidadTools";
import { AgruparExplorador, CuartilesExplorador, DispersionExplorador, TablaParametrosExplorador } from "@/components/lesson/slide/tools/EstadisticaTools";
import { PuntoMedioExplorador, RectasAnaliticaExplorador, VectorExplorador, VectoresOperacionesExplorador } from "@/components/lesson/slide/tools/AnaliticaTools";
import { EscalaExplorador, HomoteciaExplorador, SemejanzaRazonExplorador, SombraExplorador, TalesExplorador } from "@/components/lesson/slide/tools/SemejanzaTools";
import { CompuestoExplorador, ExponencialExplorador, HiperbolaExplorador, ParabolaExplorador, RadicalExplorador } from "@/components/lesson/slide/tools/FamiliasTools";
import { PendientePuntosExplorador, RectaMnExplorador, TrozosExplorador } from "@/components/lesson/slide/tools/LinealesTools";
import { AparcamientoExplorador, FuncionExplorador, PeriodicaExplorador } from "@/components/lesson/slide/tools/FuncionesTools";
import { CapitalesSistemaExplorador, RectaDosIncognitasExplorador, ReduccionExplorador, SistemaGraficoExplorador, SistemaNoLinealExplorador } from "@/components/lesson/slide/tools/SistemasTools";
import { CuadraticaExplorador, EcuacionLinealExplorador, InecuacionExplorador, RaicesFactoresExplorador, RepartoEcuacionExplorador, TanteoExplorador } from "@/components/lesson/slide/tools/EcuacionesTools";
import { FactorComunExplorador, McmExplorador, MonomioExplorador, MonomiosOperador, PolinomioExplorador, PolinomiosOperador, ProductoPolinomiosExplorador } from "@/components/lesson/slide/tools/AlgebraTools";
import { CompuestaExplorador, IndiceVariacionExplorador, InteresExplorador, MezclaExplorador, MovilesExplorador, ProporcionExplorador, RepartoExplorador } from "@/components/lesson/slide/tools/ProblemasTools";
import { ConjuntosExplorador, RacionalizarExplorador, RadicalExponencialExplorador, RadicalSimplificador, RaizAproxExplorador, RaizIndiceExplorador } from "@/components/lesson/slide/tools/RealesTools";
import { AproximacionExplorador, DecimalExplorador, GeneratrizExplorador, NotacionExplorador } from "@/components/lesson/slide/tools/DecimalesTools";
import { EnterosExplorador, GastoRestoExplorador, PotenciaExplorador, RacionalExplorador } from "@/components/lesson/slide/tools/NumerosTools";
import { decEs, sectorPath } from "@/components/lesson/anim/fraction";
import { MANIM } from "@/components/lesson/anim/palette";


/** Barra(s) de una unidad partida en `d` trozos con `n` coloreados (puede ocupar más de una unidad). */
function Bars({ n, d, color }: { n: number; d: number; color: string }) {
  const wholes = Math.max(1, Math.ceil(n / d));
  const W = 440;
  const H = 40;
  const gap = 14;
  const cell = W / d;
  return (
    <svg viewBox={`0 0 ${W + 4} ${wholes * (H + gap) - gap + 4}`} className="block w-full" aria-hidden focusable="false">
      {Array.from({ length: wholes }, (_, w) => {
        const filled = clamp(n - w * d, 0, d);
        const y = 2 + w * (H + gap);
        return (
          <g key={w}>
            <rect x={2} y={y} width={W} height={H} rx={5} fill={MANIM.panel} />
            <rect x={2} y={y} width={filled * cell} height={H} rx={5} fill={color} fillOpacity={0.85} className="anim-t" />
            {Array.from({ length: d + 1 }, (_, i) => (
              <line key={i} x1={2 + i * cell} y1={y} x2={2 + i * cell} y2={y + H} stroke={MANIM.yellow} strokeWidth={i === 0 || i === d ? 2.5 : 1.2} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Una pizza partida en `d` porciones con `filled` coloreadas; con más de una unidad se dibujan varias. */
function Pizzas({ n, d, color }: { n: number; d: number; color: string }) {
  const wholes = Math.max(1, Math.ceil(n / d));
  const R = 84;
  const gap = 28;
  const W = wholes * 2 * R + (wholes - 1) * gap + 8;
  return (
    <svg viewBox={`0 0 ${W} ${2 * R + 8}`} className="mx-auto block h-48 w-auto max-w-full" aria-hidden focusable="false" data-testid="tool-pizzas">
      {Array.from({ length: wholes }, (_, w) => {
        const filled = clamp(n - w * d, 0, d);
        const cx = 4 + R + w * (2 * R + gap);
        const cy = 4 + R;
        return (
          <g key={w}>
            {Array.from({ length: d }, (_, i) => {
              const props = {
                fill: i < filled ? color : MANIM.panel,
                fillOpacity: i < filled ? 0.9 : 1,
                stroke: MANIM.yellow,
                strokeWidth: 2,
                strokeLinejoin: "round" as const,
                className: "anim-t",
              };
              return d === 1 ? (
                <circle key={i} cx={cx} cy={cy} r={R} {...props} />
              ) : (
                <path key={i} d={sectorPath(cx, cy, R, i, d)} {...props} />
              );
            })}
            <circle cx={cx} cy={cy} r={R} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} />
          </g>
        );
      })}
    </svg>
  );
}

/** Recta de 0 a 2 con la fracción marcada. */
function MiniLine({ value, color }: { value: number; color: string }) {
  const x = (v: number) => 20 + v * 200;
  return (
    <svg viewBox="0 0 440 56" className="mx-auto block w-full max-w-md" aria-hidden focusable="false">
      <line x1={10} y1={30} x2={430} y2={30} stroke={MANIM.ink} strokeWidth={2.5} strokeLinecap="round" />
      {[0, 1, 2].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1={22} x2={x(v)} y2={38} stroke={MANIM.ink} strokeWidth={3} />
          <text x={x(v)} y={54} fill={MANIM.ink} fontSize={14} textAnchor="middle" fontWeight={600}>
            {v}
          </text>
        </g>
      ))}
      <circle cx={x(clamp(value, 0, 2))} cy={30} r={8} fill={color} className="anim-t" />
    </svg>
  );
}

/** Numerador y denominador libres: la fracción se ve como barra, como punto en la recta y como decimal. */
function FraccionExplorador({ block }: { block: ToolBlock }) {
  const init = { n: block.params?.n ?? 3, d: block.params?.d ?? 8 };
  const [n, setN] = useState(clamp(init.n, 0, 2 * init.d));
  const [d, setD] = useState(clamp(init.d, 1, 12));

  const changeD = (next: number) => {
    setD(next);
    setN((cur) => clamp(cur, 0, 2 * next));
  };
  const value = n / d;
  const exact = (n * 1000) % d === 0;
  const kind = n < d ? "menor que 1" : n === d ? "igual a 1" : "mayor que 1";
  const color = n < d ? MANIM.blue : n === d ? MANIM.yellow : MANIM.red;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el numerador y el denominador y fíjate cuándo la fracción cruza el 1."}
      onReset={() => {
        setN(clamp(init.n, 0, 2 * init.d));
        setD(clamp(init.d, 1, 12));
      }}
      controls={
        <>
          <Slider label="Numerador (partes que coges)" value={n} min={0} max={2 * d} color={MANIM.orange} onChange={setN} />
          <Slider label="Denominador (partes iguales)" value={d} min={1} max={12} color={MANIM.blue} onChange={changeD} />
        </>
      }
    >
      <div className="flex items-center justify-center gap-6" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{${n}}{${d}}$`} className="text-4xl" />
        <span className="text-xl font-semibold" style={{ color }}>
          {kind}
        </span>
        <span className="text-xl tabular-nums text-[color:var(--stage-ink,#fff)]">
          {exact ? "=" : "≈"} {decEs(value)}
        </span>
      </div>
      <Pizzas n={n} d={d} color={color} />
      <MiniLine value={value} color={color} />
    </Frame>
  );
}

/** Se multiplican numerador y denominador por k: las barras cambian de trozos, no de porción. */
function FraccionEquivalentes({ block }: { block: ToolBlock }) {
  const n0 = block.params?.n ?? 2;
  const d0 = block.params?.d ?? 5;
  const initK = block.params?.k ?? 2;
  const [k, setK] = useState(clamp(initK, 1, 6));

  return (
    <Frame
      hint={block.hint ?? `Cambia k: la fracción ${n0}/${d0} se escribe de otra forma, pero la parte coloreada mide lo mismo.`}
      onReset={() => setK(clamp(initK, 1, 6))}
      controls={
        <>
          <MathRenderer text={`Fracción de partida: $\\dfrac{${n0}}{${d0}}$`} className="text-lg" />
          <Slider label="Multiplicar arriba y abajo por k" value={k} min={1} max={6} color={MANIM.green} onChange={setK} />
        </>
      }
    >
      <div className="flex items-baseline gap-4" data-testid="tool-readout">
        <MathRenderer
          text={`$\\dfrac{${n0}}{${d0}} = \\dfrac{${n0} \\cdot ${k}}{${d0} \\cdot ${k}} = \\dfrac{${n0 * k}}{${d0 * k}}$`}
          className="text-2xl"
        />
      </div>
      <Bars n={n0} d={d0} color={MANIM.blue} />
      <Bars n={n0 * k} d={d0 * k} color={MANIM.green} />
    </Frame>
  );
}

const MAX_N = 10;

/** Máquina `a·n + b`: el alumno mueve `n` y ve la cuenta y el resultado entre todos los valores de la tabla. */
function ValorNumerico({ block }: { block: ToolBlock }) {
  const a = clamp(block.params?.a ?? 2, 1, 9);
  const b = clamp(block.params?.b ?? 3, -9, 9);
  const initN = clamp(block.params?.n ?? 5, 0, MAX_N);
  const [n, setN] = useState(initN);
  const out = (k: number) => a * k + b;
  const top = Math.max(1, ...Array.from({ length: MAX_N + 1 }, (_, k) => out(k)));
  const W = 440;
  const H = 130;
  const cell = W / (MAX_N + 1);
  const sign = b < 0 ? "-" : "+";

  return (
    <Frame
      hint={block.hint ?? "Mueve n y fíjate en que la misma regla sirve para cualquier número."}
      onReset={() => setN(initN)}
      controls={
        <>
          <MathRenderer text={`Regla: $n \\longrightarrow ${a === 1 ? "" : a}n ${sign} ${Math.abs(b)}$`} className="text-lg" />
          <Slider label="Número n que entra" value={n} min={0} max={MAX_N} color={MANIM.orange} onChange={setN} />
        </>
      }
    >
      <div className="flex items-baseline gap-4" data-testid="tool-readout">
        <MathRenderer text={`$${a} \\cdot ${n} ${sign} ${Math.abs(b)} = ${out(n)}$`} className="text-3xl" />
      </div>
      <svg viewBox={`0 0 ${W + 4} ${H + 28}`} className="block w-full" aria-hidden focusable="false">
        {Array.from({ length: MAX_N + 1 }, (_, k) => {
          const h = (Math.max(0, out(k)) / top) * H;
          const active = k === n;
          return (
            <g key={k}>
              <rect x={2 + k * cell + 4} y={H - h} width={cell - 8} height={Math.max(h, 2)} rx={4} fill={active ? MANIM.green : MANIM.blue} fillOpacity={active ? 0.95 : 0.45} className="anim-t" />
              <text x={2 + k * cell + cell / 2} y={H + 18} fontSize={13} textAnchor="middle" fill={active ? MANIM.green : MANIM.muted}>
                {k}
              </text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

const BAL = { minB: -6, maxB: 9, minC: -6, maxC: 21 } as const;

function eqText(a: number, b: number, c: number): string {
  const lhs = `${a > 1 ? a : ""}x${b > 0 ? ` + ${b}` : b < 0 ? ` - ${-b}` : ""}`;
  return `${lhs} = ${c}`;
}

function Dots({ count }: { count: number }) {
  const neg = count < 0;
  return (
    <>
      {Array.from({ length: Math.abs(count) }, (_, i) => (
        <span
          key={i}
          className="inline-block size-5 rounded-full"
          style={neg ? { border: `2.5px dashed ${MANIM.red}` } : { background: MANIM.yellow }}
        />
      ))}
    </>
  );
}

/** Balanza `a·x + b = c`: lo que se haga en los dos platos mantiene el equilibrio y la solución. */
function BalanzaExplorador({ block }: { block: ToolBlock }) {
  const a0 = clamp(block.params?.a ?? 2, 1, 5);
  const b0 = clamp(block.params?.b ?? 3, BAL.minB, BAL.maxB);
  const c0 = clamp(block.params?.c ?? 11, BAL.minC, BAL.maxC);
  const [eq, setEq] = useState({ a: a0, b: b0, c: c0 });
  const solution = (c0 - b0) / a0;
  const { a, b, c } = eq;
  const addBoth = (d: number) => setEq((e) => ({ ...e, b: e.b + d, c: e.c + d }));
  const canAdd = (d: number) => b + d >= BAL.minB && b + d <= BAL.maxB && c + d >= BAL.minC && c + d <= BAL.maxC;
  const canDivide = a > 1 && b % a === 0 && c % a === 0;
  const btn =
    "rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <Frame
      hint={block.hint ?? "Haz lo mismo en los dos platos y comprueba que la solución de x no cambia."}
      onReset={() => setEq({ a: a0, b: b0, c: c0 })}
      controls={
        <>
          <button type="button" className={btn} disabled={!canAdd(1)} onClick={() => addBoth(1)}>
            Sumar 1 a los dos platos
          </button>
          <button type="button" className={btn} disabled={!canAdd(-1)} onClick={() => addBoth(-1)}>
            Restar 1 a los dos platos
          </button>
          <button
            type="button"
            className={btn}
            disabled={!canDivide}
            title={canDivide ? undefined : "Solo se puede dividir si el número que multiplica a x divide a todo lo demás"}
            onClick={() => setEq({ a: 1, b: b / a, c: c / a })}
          >
            {a > 1 ? `Dividir entre ${a} los dos platos` : "Dividir los dos platos"}
          </button>
        </>
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1" data-testid="tool-readout">
        <MathRenderer text={`$${eqText(a, b, c)}$`} className="text-3xl" />
        <span className="text-lg font-semibold" style={{ color: MANIM.green }}>
          Solución: x = {solution}
        </span>
      </div>
      <div className="flex items-end justify-center gap-3" aria-hidden>
        <div className="flex min-h-24 flex-1 flex-wrap content-end items-end gap-1.5 rounded-b-3xl border-b-4 border-[color:var(--stage-muted,#b8c2d0)] bg-white/5 p-3">
          {Array.from({ length: a }, (_, i) => (
            <span key={i} className="flex size-9 items-center justify-center rounded-md text-lg font-extrabold" style={{ background: MANIM.blue, color: MANIM.surface }}>
              x
            </span>
          ))}
          <Dots count={b} />
        </div>
        <span className="pb-2 text-2xl font-bold text-[color:var(--stage-ink,#fff)]">=</span>
        <div className="flex min-h-24 flex-1 flex-wrap content-end items-end gap-1.5 rounded-b-3xl border-b-4 border-[color:var(--stage-muted,#b8c2d0)] bg-white/5 p-3">
          <Dots count={c} />
        </div>
      </div>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">La balanza sigue equilibrada: hagas lo que hagas, si lo haces en los dos platos.</p>
    </Frame>
  );
}

/** Cuadrícula de 100 casillas: el alumno elige el porcentaje y se pintan tantas casillas como indica. */
function PorcentajeCuadricula({ block }: { block: ToolBlock }) {
  const init = clamp(Math.round(block.params?.a ?? 35), 0, 100);
  const [pct, setPct] = useState(init);
  const CELL = 38;
  const btn =
    "rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm font-semibold tabular-nums text-[color:var(--stage-ink,#fff)] hover:bg-white/10";

  return (
    <Frame
      hint={block.hint ?? "Mueve el porcentaje y cuenta las casillas pintadas: cada casilla es el 1 %."}
      onReset={() => setPct(init)}
      controls={
        <>
          <Slider label="Porcentaje" value={pct} min={0} max={100} color={MANIM.yellow} onChange={setPct} />
          <div className="flex flex-wrap gap-2">
            {[10, 25, 50, 75, 100].map((v) => (
              <button key={v} type="button" className={btn} onClick={() => setPct(v)}>
                {v} %
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1" data-testid="tool-readout">
        <MathRenderer text={`$${pct}\\% = \\dfrac{${pct}}{100} = ${decEs(pct / 100)}$`} className="text-3xl" />
        <span className="text-lg font-semibold" style={{ color: MANIM.yellow }}>
          {pct} casillas de cada 100
        </span>
      </div>
      <svg viewBox={`0 0 ${10 * CELL + 4} ${10 * CELL + 4}`} className="mx-auto block h-64 w-auto max-w-full" aria-hidden focusable="false" data-testid="tool-grid">
        {Array.from({ length: 100 }, (_, i) => {
          const r = Math.floor(i / 10);
          const c = i % 10;
          const on = (9 - r) * 10 + c < pct;
          return (
            <rect
              key={i}
              x={2 + c * CELL + 2}
              y={2 + r * CELL + 2}
              width={CELL - 4}
              height={CELL - 4}
              rx={4}
              fill={on ? MANIM.yellow : "none"}
              fillOpacity={on ? 0.9 : 0}
              stroke={on ? MANIM.yellow : MANIM.grid}
              strokeWidth={2}
              className="anim-t"
            />
          );
        })}
      </svg>
    </Frame>
  );
}

/** Herramienta interactiva dentro de una diapositiva (el alumno cambia valores y ve el resultado). */
export function SlideTool({ block }: { block: ToolBlock }) {
  switch (block.tool) {
    case "fraccion-explorador":
      return <FraccionExplorador block={block} />;
    case "fraccion-equivalentes":
      return <FraccionEquivalentes block={block} />;
    case "fraction-product":
      return <FractionProductTool initial={block.initial} />;
    case "valor-numerico":
      return <ValorNumerico block={block} />;
    case "enteros-explorador":
      return <EnterosExplorador block={block} />;
    case "potencia-explorador":
      return <PotenciaExplorador block={block} />;
    case "racional-explorador":
      return <RacionalExplorador block={block} />;
    case "gasto-resto-explorador":
      return <GastoRestoExplorador block={block} />;
    case "decimal-explorador":
      return <DecimalExplorador block={block} />;
    case "generatriz-explorador":
      return <GeneratrizExplorador block={block} />;
    case "aproximacion-explorador":
      return <AproximacionExplorador block={block} />;
    case "notacion-explorador":
      return <NotacionExplorador block={block} />;
    case "raiz-aprox-explorador":
      return <RaizAproxExplorador block={block} />;
    case "conjuntos-explorador":
      return <ConjuntosExplorador block={block} />;
    case "raiz-indice-explorador":
      return <RaizIndiceExplorador block={block} />;
    case "radical-exponencial-explorador":
      return <RadicalExponencialExplorador block={block} />;
    case "radical-simplificador":
      return <RadicalSimplificador block={block} />;
    case "racionalizar-explorador":
      return <RacionalizarExplorador block={block} />;
    case "proporcion-explorador":
      return <ProporcionExplorador block={block} />;
    case "compuesta-explorador":
      return <CompuestaExplorador block={block} />;
    case "reparto-explorador":
      return <RepartoExplorador block={block} />;
    case "mezcla-explorador":
      return <MezclaExplorador block={block} />;
    case "moviles-explorador":
      return <MovilesExplorador block={block} />;
    case "indice-variacion-explorador":
      return <IndiceVariacionExplorador block={block} />;
    case "interes-explorador":
      return <InteresExplorador block={block} />;
    case "monomio-explorador":
      return <MonomioExplorador block={block} />;
    case "monomios-operador":
      return <MonomiosOperador block={block} />;
    case "polinomio-explorador":
      return <PolinomioExplorador block={block} />;
    case "polinomios-operador":
      return <PolinomiosOperador block={block} />;
    case "producto-polinomios-explorador":
      return <ProductoPolinomiosExplorador block={block} />;
    case "factor-comun-explorador":
      return <FactorComunExplorador block={block} />;
    case "mcm-explorador":
      return <McmExplorador block={block} />;
    case "tanteo-explorador":
      return <TanteoExplorador block={block} />;
    case "ecuacion-lineal-explorador":
      return <EcuacionLinealExplorador block={block} />;
    case "cuadratica-explorador":
      return <CuadraticaExplorador block={block} />;
    case "raices-factores-explorador":
      return <RaicesFactoresExplorador block={block} />;
    case "reparto-ecuacion-explorador":
      return <RepartoEcuacionExplorador block={block} />;
    case "recta-dos-incognitas-explorador":
      return <RectaDosIncognitasExplorador block={block} />;
    case "sistema-grafico-explorador":
      return <SistemaGraficoExplorador block={block} />;
    case "reduccion-explorador":
      return <ReduccionExplorador block={block} />;
    case "sistema-no-lineal-explorador":
      return <SistemaNoLinealExplorador block={block} />;
    case "capitales-sistema-explorador":
      return <CapitalesSistemaExplorador block={block} />;
    case "recta-mn-explorador":
      return <RectaMnExplorador block={block} />;
    case "pendiente-puntos-explorador":
      return <PendientePuntosExplorador block={block} />;
    case "trozos-explorador":
      return <TrozosExplorador block={block} />;
    case "escala-explorador":
      return <EscalaExplorador block={block} />;
    case "semejanza-razon-explorador":
      return <SemejanzaRazonExplorador block={block} />;
    case "tales-explorador":
      return <TalesExplorador block={block} />;
    case "sombra-explorador":
      return <SombraExplorador block={block} />;
    case "homotecia-explorador":
      return <HomoteciaExplorador block={block} />;
    case "urna-arbol-explorador":
      return <UrnaArbolExplorador block={block} />;
    case "dos-dados-explorador":
      return <DosDadosExplorador block={block} />;
    case "independientes-explorador":
      return <IndependientesExplorador block={block} />;
    case "tabla-parametros-explorador":
      return <TablaParametrosExplorador block={block} />;
    case "agrupar-explorador":
      return <AgruparExplorador block={block} />;
    case "cuartiles-explorador":
      return <CuartilesExplorador block={block} />;
    case "dispersion-explorador":
      return <DispersionExplorador block={block} />;
    case "vector-explorador":
      return <VectorExplorador block={block} />;
    case "vectores-operaciones-explorador":
      return <VectoresOperacionesExplorador block={block} />;
    case "punto-medio-explorador":
      return <PuntoMedioExplorador block={block} />;
    case "rectas-analitica-explorador":
      return <RectasAnaliticaExplorador block={block} />;
    case "parabola-explorador":
      return <ParabolaExplorador block={block} />;
    case "hiperbola-explorador":
      return <HiperbolaExplorador block={block} />;
    case "radical-explorador":
      return <RadicalExplorador block={block} />;
    case "exponencial-explorador":
      return <ExponencialExplorador block={block} />;
    case "compuesto-explorador":
      return <CompuestoExplorador block={block} />;
    case "funcion-explorador":
      return <FuncionExplorador block={block} />;
    case "periodica-explorador":
      return <PeriodicaExplorador block={block} />;
    case "aparcamiento-explorador":
      return <AparcamientoExplorador block={block} />;
    case "inecuacion-explorador":
      return <InecuacionExplorador block={block} />;
    case "balanza-explorador":
      return <BalanzaExplorador block={block} />;
    case "porcentaje-cuadricula":
      return <PorcentajeCuadricula block={block} />;
    case "rectas-posicion":
      return <RectasPosicion block={block} />;
    case "punto-mediatriz":
      return <PuntoMediatriz block={block} />;
    case "compas-mediatriz":
      return <CompasMediatriz block={block} />;
    case "compas-bisectriz":
      return <CompasBisectriz block={block} />;
    case "bisectriz-explorador":
      return <BisectrizExplorador block={block} />;
    case "angulo-explorador":
      return <AnguloExplorador block={block} />;
    case "angulos-suma":
      return <AngulosSuma block={block} />;
    case "paralelas-explorador":
      return <ParalelasExplorador block={block} />;
    case "transportador":
      return <Transportador block={block} />;
    case "triangulo-explorador":
      return <TrianguloExplorador block={block} />;
    case "poligono-explorador":
      return <PoligonoExplorador block={block} />;
    case "triangulo-clasificador":
      return <TrianguloClasificador block={block} />;
    case "triangulo-centros":
      return <TrianguloCentros block={block} />;
    case "paralelogramo-explorador":
      return <ParalelogramoExplorador block={block} />;
    case "poligono-regular-explorador":
      return <PoligonoRegularExplorador block={block} />;
    case "circ-recta-explorador":
      return <CircRectaExplorador block={block} />;
    case "circ-circ-explorador":
      return <CircCircExplorador block={block} />;
    case "poliedro-explorador":
      return <PoliedroExplorador block={block} />;
    case "rectangulo-explorador":
      return <RectanguloExplorador block={block} />;
    case "paralelogramo-area":
      return <ParalelogramoArea block={block} />;
    case "trapecio-area":
      return <TrapecioArea block={block} />;
    case "triangulo-area":
      return <TrianguloArea block={block} />;
    case "poligono-regular-area":
      return <PoligonoRegularArea block={block} />;
    case "circulo-explorador":
      return <CirculoExplorador block={block} />;
    case "plano-explorador":
      return <PlanoExplorador block={block} />;
    case "datos-explorador":
      return <DatosExplorador block={block} />;
    case "sectores-explorador":
      return <SectoresExplorador block={block} />;
    case "dado-simulador":
      return <DadoSimulador block={block} />;
    case "laplace-explorador":
      return <LaplaceExplorador block={block} />;
    case "aleacion-concentracion":
      return <AleacionConcentracion block={block} />;
    case "energia-fusion":
      return <EnergiaFusion block={block} />;
    case "gibbs-explorador":
      return <GibbsExplorador block={block} />;
    case "diagrama-binario":
      return <DiagramaBinario block={block} />;
    case "diagrama-eutectico":
      return <DiagramaEutectico block={block} />;
    case "fe-c-explorador":
      return <FeCExplorador block={block} />;
    case "acero-clasificador":
      return <AceroClasificador block={block} />;
    case "resistencia-especifica":
      return <ResistenciaEspecifica block={block} />;
    case "pieza-peso-minimo":
      return <PiezaPesoMinimo block={block} />;
    case "aleaciones-filtro":
      return <AleacionesFiltro block={block} />;
    case "grieta-griffith":
      return <GrietaGriffith block={block} />;
    case "grado-polimerizacion":
      return <GradoPolimerizacion block={block} />;
    case "rtp-comunidades":
      return <RtpComunidades block={block} />;
    case "intersticio-red":
      return <IntersticioRed block={block} />;
    case "dureza-martensita":
      return <DurezaMartensita block={block} />;
    case "ttt-explorador":
      return <TttExplorador block={block} />;
    case "jominy-explorador":
      return <JominyExplorador block={block} />;
    case "temperaturas-tratamiento":
      return <TemperaturasTratamiento block={block} />;
    case "perfil-dureza":
      return <PerfilDureza block={block} />;
    case "pila-electroquimica":
      return <PilaElectroquimica block={block} />;
    case "nernst-explorador":
      return <NernstExplorador block={block} />;
    case "faraday-explorador":
      return <FaradayExplorador block={block} />;
    case "recubrimiento-rayado":
      return <RecubrimientoRayado block={block} />;
    case "pilling-bedworth":
      return <PillingBedworth block={block} />;
    case "conversor-industrial":
      return <ConversorIndustrial block={block} />;
    case "plano-inclinado-trabajo":
      return <PlanoInclinadoTrabajo block={block} />;
    case "resorte-explorador":
      return <ResorteExplorador block={block} />;
    case "energia-rampa":
      return <EnergiaRampa block={block} />;
    case "momento-inercia":
      return <MomentoInercia block={block} />;
    case "equilibrio-termico":
      return <EquilibrioTermico block={block} />;
    case "primer-principio-explorador":
      return <PrimerPrincipio block={block} />;
    case "rendimiento-cadena":
      return <RendimientoCadena block={block} />;
    case "potencia-vehiculo":
      return <PotenciaVehiculo block={block} />;
    case "par-trabajo-explorador":
      return <ParTrabajo block={block} />;
    case "diagrama-pv":
      return <DiagramaPV block={block} />;
    case "potencia-electrica-hidraulica":
      return <PotenciaElectricaHidraulica block={block} />;
    case "isotopos-explorador":
      return <IsotoposExplorador block={block} />;
    case "curva-enlace-explorador":
      return <CurvaEnlaceExplorador block={block} />;
    case "electronegatividad-explorador":
      return <ElectronegatividadExplorador block={block} />;
    case "covalente-explorador":
      return <CovalenteExplorador block={block} />;
    case "enlace-fusion-grafica":
      return <EnlaceFusionGrafica block={block} />;
    case "celda-explorador":
      return <CeldaExplorador block={block} />;
    case "alotropia-explorador":
      return <AlotropiaExplorador block={block} />;
    case "tension-deformacion-explorador":
      return <TensionDeformacionExplorador block={block} />;
    case "diagrama-traccion-explorador":
      return <DiagramaTraccionExplorador block={block} />;
    case "hooke-explorador":
      return <HookeExplorador block={block} />;
    case "tension-trabajo-explorador":
      return <TensionTrabajoExplorador block={block} />;
    case "brinell-explorador":
      return <BrinellExplorador block={block} />;
    case "vickers-explorador":
      return <VickersExplorador block={block} />;
    case "rockwell-explorador":
      return <RockwellExplorador block={block} />;
    case "charpy-explorador":
      return <CharpyExplorador block={block} />;
    case "fatiga-explorador":
      return <FatigaExplorador block={block} />;
    case "carnot-explorador":
      return <CarnotExplorador block={block} />;
    case "brayton-explorador":
      return <BraytonExplorador block={block} />;
    case "otto-diesel-explorador":
      return <OttoDieselExplorador block={block} />;
    case "potencia-motor-explorador":
      return <PotenciaMotorExplorador block={block} />;
    case "cilindrada-explorador":
      return <CilindradaExplorador block={block} />;
    case "frigorifica-explorador":
      return <FrigorificaExplorador block={block} />;
    case "motor-tiempos-explorador":
      return <MotorTiemposExplorador block={block} />;
    case "campo-hilo-explorador":
      return <CampoHiloExplorador block={block} />;
    case "lorentz-explorador":
      return <LorentzExplorador block={block} />;
    case "espira-par-explorador":
      return <EspiraParExplorador block={block} />;
    case "fem-induccion-explorador":
      return <FemInduccionExplorador block={block} />;
    case "motor-cc-explorador":
      return <MotorCcExplorador block={block} />;
    case "curvas-cc-explorador":
      return <CurvasCcExplorador block={block} />;
    case "balance-cc-explorador":
      return <BalanceCcExplorador block={block} />;
    case "arranque-cc-explorador":
      return <ArranqueCcExplorador block={block} />;
    case "velocidad-trifasico-explorador":
      return <VelocidadTrifasicoExplorador block={block} />;
    case "trifasico-conexion-explorador":
      return <TrifasicoConexionExplorador block={block} />;
    case "curva-par-asincrono-explorador":
      return <CurvaParAsincronoExplorador block={block} />;
    case "presion-neumatica-explorador":
      return <PresionNeumaticaExplorador block={block} />;
    case "caudal-cilindro-explorador":
      return <CaudalCilindroExplorador block={block} />;
    case "relacion-compresion-explorador":
      return <RelacionCompresionExplorador block={block} />;
    case "fuerza-cilindro-explorador":
      return <FuerzaCilindroExplorador block={block} />;
    case "consumo-aire-explorador":
      return <ConsumoAireExplorador block={block} />;
    case "valvula-nomenclatura-explorador":
      return <ValvulaNomenclaturaExplorador block={block} />;
    case "logica-neumatica-explorador":
      return <LogicaNeumaticaExplorador block={block} />;
    case "ventosa-vacio-explorador":
      return <VentosaVacioExplorador block={block} />;
    case "numeracion-neumatica-explorador":
      return <NumeracionNeumaticaExplorador block={block} />;
    case "pascal-prensa-explorador":
      return <PascalPrensaExplorador block={block} />;
    case "continuidad-bernoulli-explorador":
      return <ContinuidadBernoulliExplorador block={block} />;
    case "viscosidad-fuerza-explorador":
      return <ViscosidadFuerzaExplorador block={block} />;
    case "energia-bernoulli-explorador":
      return <EnergiaBernoulliExplorador block={block} />;
    case "potencia-hidraulica-explorador":
      return <PotenciaHidraulicaExplorador block={block} />;
    case "perdida-carga-explorador":
      return <PerdidaCargaExplorador block={block} />;
    case "bomba-caudal-explorador":
      return <BombaCaudalExplorador block={block} />;
    case "cilindro-hidraulico-explorador":
      return <CilindroHidraulicoExplorador block={block} />;
    case "limitadora-explorador":
      return <LimitadoraExplorador block={block} />;
    case "lazo-perturbacion-explorador":
      return <LazoPerturbacionExplorador block={block} />;
    case "segundo-orden-explorador":
      return <SegundoOrdenExplorador block={block} />;
    case "bloques-explorador":
      return <BloquesExplorador block={block} />;
    case "routh-explorador":
      return <RouthExplorador block={block} />;
    case "pid-explorador":
      return <PidExplorador block={block} />;
    case "cuantizacion-ad-explorador":
      return <CuantizacionAdExplorador block={block} />;
    case "sensor-curva-explorador":
      return <SensorCurvaExplorador block={block} />;
    case "sensor-proximidad-explorador":
      return <SensorProximidadExplorador block={block} />;
    case "potenciometro-divisor-explorador":
      return <PotenciometroDivisorExplorador block={block} />;
    case "puente-potenciometros-explorador":
      return <PuentePotenciometrosExplorador block={block} />;
    case "galga-deformacion-explorador":
      return <GalgaDeformacionExplorador block={block} />;
    case "encoder-rpm-explorador":
      return <EncoderRpmExplorador block={block} />;
    case "termorresistencia-puente-explorador":
      return <TermorresistenciaPuenteExplorador block={block} />;
    case "operacional-inversor-explorador":
      return <OperacionalInversorExplorador block={block} />;
    case "binario-byte-explorador":
      return <BinarioByteExplorador block={block} />;
    case "conversion-decimal-binario-explorador":
      return <ConversionDecimalBinarioExplorador block={block} />;
    case "logica-niveles-explorador":
      return <LogicaNivelesExplorador block={block} />;
    case "puerta-logica-explorador":
      return <PuertaLogicaExplorador block={block} />;
    case "hex-bcd-explorador":
      return <HexBcdExplorador block={block} />;
    case "morgan-explorador":
      return <MorganExplorador block={block} />;
    case "formas-canonicas-explorador":
      return <FormasCanonicasExplorador block={block} />;
    case "karnaugh-explorador":
      return <KarnaughExplorador block={block} />;
    case "nand-nor-explorador":
      return <NandNorExplorador block={block} />;
    case "mux-decoder-explorador":
      return <MuxDecoderExplorador block={block} />;
    case "sumador-binario-explorador":
      return <SumadorBinarioExplorador block={block} />;
    case "secuencial-memoria-explorador":
      return <SecuencialMemoriaExplorador block={block} />;
    case "biestable-rs-explorador":
      return <BiestableRsExplorador block={block} />;
    case "biestable-jk-explorador":
      return <BiestableJkExplorador block={block} />;
    case "cableado-elementos-explorador":
      return <CableadoElementosExplorador block={block} />;
    case "grafo-bimodal-explorador":
      return <GrafoBimodalExplorador block={block} />;
    case "secuencia-reles-explorador":
      return <SecuenciaRelesExplorador block={block} />;
    case "registro-contador-explorador":
      return <RegistroContadorExplorador block={block} />;
    case "motor-enclavamiento-explorador":
      return <MotorEnclavamientoExplorador block={block} />;
    case "intervalo-explorador":
      return <IntervaloExplorador block={block} />;
    case "sistema-inecuaciones-explorador":
      return <SistemaInecuacionesExplorador block={block} />;
    case "ruffini-explorador":
      return <RuffiniExplorador block={block} />;
    case "fraccion-alg-explorador":
      return <FraccionAlgExplorador block={block} />;
    case "trig-explorador":
      return <TrigExplorador block={block} />;
    case "trig-resolver-explorador":
      return <TrigResolverExplorador block={block} />;
    case "combinatoria-explorador":
      return <CombinatoriaExplorador block={block} />;
    case "entorno-explorador":
      return <EntornoExplorador block={block} />;
    case "complejo-explorador":
      return <ComplejoExplorador block={block} />;
    case "complejos-operaciones-explorador":
      return <ComplejosOperacionesExplorador block={block} />;
    case "potencia-compleja-explorador":
      return <PotenciaComplejaExplorador block={block} />;
    case "raices-complejas-explorador":
      return <RaicesComplejasExplorador block={block} />;
    case "logaritmo-explorador":
      return <LogaritmoExplorador block={block} />;
    case "log-propiedades-explorador":
      return <LogPropiedadesExplorador block={block} />;
    case "sistema-parametro-explorador":
      return <SistemaParametroExplorador block={block} />;
    case "inecuacion-cuadratica-explorador":
      return <InecuacionCuadraticaExplorador block={block} />;
    case "region-inecuaciones-explorador":
      return <RegionInecuacionesExplorador block={block} />;
    case "sucesion-explorador":
      return <SucesionExplorador block={block} />;
    case "progresion-explorador":
      return <ProgresionExplorador block={block} />;
    case "limite-epsilon-explorador":
      return <LimiteEpsilonExplorador block={block} />;
    case "limite-racional-explorador":
      return <LimiteRacionalExplorador block={block} />;
    case "numero-e-explorador":
      return <NumeroEExplorador block={block} />;
    case "radianes-explorador":
      return <RadianesExplorador block={block} />;
    case "circulo-trig-explorador":
      return <CirculoTrigExplorador block={block} />;
    case "angulos-relacionados-explorador":
      return <AngulosRelacionadosExplorador block={block} />;
    case "suma-angulos-explorador":
      return <SumaAngulosExplorador block={block} />;
    case "doble-mitad-explorador":
      return <DobleMitadExplorador block={block} />;
    case "suma-producto-explorador":
      return <SumaProductoExplorador block={block} />;
    case "ecuacion-trig-explorador":
      return <EcuacionTrigExplorador block={block} />;
    case "triangulo-general-explorador":
      return <TrianguloGeneralExplorador block={block} />;
    case "producto-escalar-explorador":
      return <ProductoEscalarExplorador block={block} />;
    case "recta-formas-explorador":
      return <RectaFormasExplorador block={block} />;
    case "rectas-angulo-explorador":
      return <RectasAnguloExplorador block={block} />;
    case "distancia-punto-recta-explorador":
      return <DistanciaPuntoRectaExplorador block={block} />;
    case "mediatriz-explorador":
      return <MediatrizExplorador block={block} />;
    case "conica-explorador":
      return <ConicaExplorador block={block} />;
    case "dominio-explorador":
      return <DominioExplorador block={block} />;
    case "simetria-explorador":
      return <SimetriaExplorador block={block} />;
    case "signo-explorador":
      return <SignoExplorador block={block} />;
    case "funcion-raiz-explorador":
      return <FuncionRaizExplorador block={block} />;
    case "exp-log-explorador":
      return <ExpLogExplorador block={block} />;
    case "trig-funcion-explorador":
      return <TrigFuncionExplorador block={block} />;
    case "abs-funcion-explorador":
      return <AbsFuncionExplorador block={block} />;
    case "oferta-demanda-explorador":
      return <OfertaDemandaExplorador block={block} />;
    case "composicion-explorador":
      return <ComposicionExplorador block={block} />;
    case "inversa-explorador":
      return <InversaExplorador block={block} />;
    case "limite-tabla-explorador":
      return <LimiteTablaExplorador block={block} />;
    case "limite-lateral-explorador":
      return <LimiteLateralExplorador block={block} />;
    case "limite-infinito-explorador":
      return <LimiteInfinitoExplorador block={block} />;
    case "asintotas-explorador":
      return <AsintotasExplorador block={block} />;
    case "cero-cero-explorador":
      return <CeroCeroExplorador block={block} />;
    case "limite-grados-explorador":
      return <LimiteGradosExplorador block={block} />;
    case "continuidad-k-explorador":
      return <ContinuidadKExplorador block={block} />;
    case "operaciones-limite-explorador":
      return <OperacionesLimiteExplorador block={block} />;
    case "resta-fracciones-explorador":
      return <RestaFraccionesExplorador block={block} />;
    case "secante-explorador":
      return <SecanteExplorador block={block} />;
    case "derivabilidad-explorador":
      return <DerivabilidadExplorador block={block} />;
    case "funcion-derivada-explorador":
      return <FuncionDerivadaExplorador block={block} />;
    case "producto-cociente-explorador":
      return <ProductoCocienteExplorador block={block} />;
    case "cadena-explorador":
      return <CadenaExplorador block={block} />;
    case "derivada-inversa-explorador":
      return <DerivadaInversaExplorador block={block} />;
    case "velocidad-aceleracion-explorador":
      return <VelocidadAceleracionExplorador block={block} />;
    case "extremos-explorador":
      return <ExtremosExplorador block={block} />;
    case "optimizacion-explorador":
      return <OptimizacionExplorador block={block} />;
    case "sucesos-venn-explorador":
      return <SucesosVennExplorador block={block} />;
    case "prob-union-explorador":
      return <ProbUnionExplorador block={block} />;
    case "tabla-contingencia-explorador":
      return <TablaContingenciaExplorador block={block} />;
    case "arbol-tabla-explorador":
      return <ArbolTablaExplorador block={block} />;
    case "prob-total-explorador":
      return <ProbTotalExplorador block={block} />;
    case "azar-famoso-explorador":
      return <AzarFamosoExplorador block={block} />;
    case "percentiles-explorador":
      return <PercentilesExplorador block={block} />;
    case "doble-entrada-explorador":
      return <DobleEntradaExplorador block={block} />;
    case "nube-regresion-explorador":
      return <NubeRegresionExplorador block={block} />;
    case "capitalizacion-explorador":
      return <CapitalizacionExplorador block={block} />;
    case "prestamo-explorador":
      return <PrestamoExplorador block={block} />;
    case "tae-explorador":
      return <TaeExplorador block={block} />;
    case "interpolacion-explorador":
      return <InterpolacionExplorador block={block} />;
    case "diferencias-explorador":
      return <DiferenciasExplorador block={block} />;
    case "parte-entera-explorador":
      return <ParteEnteraExplorador block={block} />;
    case "beneficio-explorador":
      return <BeneficioExplorador block={block} />;
    case "regresion-cuadratica-explorador":
      return <RegresionCuadraticaExplorador block={block} />;
    case "pascal-explorador":
      return <PascalExplorador block={block} />;
    case "binomio-explorador":
      return <BinomioExplorador block={block} />;
    case "cuantia-explorador":
      return <CuantiaExplorador block={block} />;
    case "binomial-explorador":
      return <BinomialExplorador block={block} />;
    case "normal-explorador":
      return <NormalExplorador block={block} />;
    case "tabla-normal-explorador":
      return <TablaNormalExplorador block={block} />;
    case "binomial-normal-explorador":
      return <BinomialNormalExplorador block={block} />;
    case "intervalo-confianza-explorador":
      return <IntervaloConfianzaExplorador block={block} />;
    case "matriz-operaciones-explorador":
      return <MatrizOperacionesExplorador block={block} />;
    case "matriz-producto-explorador":
      return <MatrizProductoExplorador block={block} />;
    case "matriz-inversa-explorador":
      return <MatrizInversaExplorador block={block} />;
    case "matriz-potencias-explorador":
      return <MatrizPotenciasExplorador block={block} />;
    case "grafo-caminos-explorador":
      return <GrafoCaminosExplorador block={block} />;
    case "matriz-conmuta-explorador":
      return <MatrizConmutaExplorador block={block} />;
    case "ecuacion-matricial-explorador":
      return <EcuacionMatricialExplorador block={block} />;
    case "determinante-area-explorador":
      return <DeterminanteAreaExplorador block={block} />;
    case "determinante-propiedades-explorador":
      return <DeterminantePropiedadesExplorador block={block} />;
    case "determinante-producto-explorador":
      return <DeterminanteProductoExplorador block={block} />;
    case "determinante-parametro-explorador":
      return <DeterminanteParametroExplorador block={block} />;
    case "adjunta-explorador":
      return <AdjuntaExplorador block={block} />;
    case "rango-menores-explorador":
      return <RangoMenoresExplorador block={block} />;
    case "sistema-rouche-explorador":
      return <SistemaRoucheExplorador block={block} />;
    case "cramer-explorador":
      return <CramerExplorador block={block} />;
    case "sistema-familia-explorador":
      return <SistemaFamiliaExplorador block={block} />;
    case "vectores-puntos-explorador":
      return <VectoresPuntosExplorador block={block} />;
    case "vectores-dependencia-explorador":
      return <VectoresDependenciaExplorador block={block} />;
    case "producto-vectorial-explorador":
      return <ProductoVectorialExplorador block={block} />;
    case "producto-mixto-explorador":
      return <ProductoMixtoExplorador block={block} />;
    case "producto-escalar-3d-explorador":
      return <ProductoEscalar3dExplorador block={block} />;
    case "recta-espacio-explorador":
      return <RectaEspacioExplorador block={block} />;
    case "plano-espacio-explorador":
      return <PlanoEspacioExplorador block={block} />;
    case "posicion-rectas-explorador":
      return <PosicionRectasExplorador block={block} />;
    case "posicion-recta-plano-explorador":
      return <PosicionRectaPlanoExplorador block={block} />;
    case "posicion-planos-explorador":
      return <PosicionPlanosExplorador block={block} />;
    case "angulos-espacio-explorador":
      return <AngulosEspacioExplorador block={block} />;
    case "proyeccion-simetrico-explorador":
      return <ProyeccionSimetricoExplorador block={block} />;
    case "distancias-espacio-explorador":
      return <DistanciasEspacioExplorador block={block} />;
    case "uno-infinito-explorador":
      return <UnoInfinitoExplorador block={block} />;
    case "lhopital-explorador":
      return <LHopitalExplorador block={block} />;
    case "estudio-funcion-explorador":
      return <EstudioFuncionExplorador block={block} />;
    case "integral-polinomio-explorador":
      return <IntegralPolinomioExplorador block={block} />;
    case "riemann-explorador":
      return <RiemannExplorador block={block} />;
    case "barrow-explorador":
      return <BarrowExplorador block={block} />;
    case "area-curvas-explorador":
      return <AreaCurvasExplorador block={block} />;
    case "volumen-revolucion-explorador":
      return <VolumenRevolucionExplorador block={block} />;
    case "integral-metodos-explorador":
      return <IntegralMetodosExplorador block={block} />;
    case "distribucion-discreta-explorador":
      return <DistribucionDiscretaExplorador block={block} />;
    case "chebychev-explorador":
      return <ChebychevExplorador block={block} />;
    case "densidad-explorador":
      return <DensidadExplorador block={block} />;
    case "intervalo-media-explorador":
      return <IntervaloMediaExplorador block={block} />;
    case "programacion-lineal-explorador":
      return <ProgramacionLinealExplorador block={block} />;
    case "media-muestral-explorador":
      return <MediaMuestralExplorador block={block} />;
    case "proporcion-muestral-explorador":
      return <ProporcionMuestralExplorador block={block} />;
    case "contraste-media-explorador":
      return <ContrasteMediaExplorador block={block} />;
    case "contraste-proporcion-explorador":
      return <ContrasteProporcionExplorador block={block} />;
    case "objeto-problema-explorador":
      return <ObjetoProblemaExplorador block={block} />;
    case "matriz-decision-explorador":
      return <MatrizDecisionExplorador block={block} />;
    case "requisitos-verificables-explorador":
      return <RequisitosExplorador block={block} />;
    case "gantt-explorador":
      return <GanttExplorador block={block} />;
    case "roles-equipo-explorador":
      return <RolesEquipoExplorador block={block} />;
    case "prototipo-ensayo-explorador":
      return <PrototipoEnsayoExplorador block={block} />;
    case "memoria-tecnica-explorador":
      return <MemoriaTecnicaExplorador block={block} />;
    case "mesa-muestras-explorador":
      return <MesaMuestrasExplorador block={block} />;
    case "estructura-atomica-explorador":
      return <EstructuraAtomicaExplorador block={block} />;
    case "propiedades-comparador-explorador":
      return <PropiedadesComparadorExplorador block={block} />;
    case "carbono-hierro-explorador":
      return <CarbonoHierroExplorador block={block} />;
    case "polimero-temperatura-explorador":
      return <PolimeroTemperaturaExplorador block={block} />;
    case "compuesto-mezclas-explorador":
      return <CompuestoMezclasExplorador block={block} />;
    case "tratamiento-curva-explorador":
      return <TratamientoCurvaExplorador block={block} />;
    case "proceso-coste-explorador":
      return <ProcesoCosteExplorador block={block} />;
    case "impresion-3d-explorador":
      return <Impresion3dExplorador block={block} />;
    case "tolerancia-calidad-explorador":
      return <ToleranciaCalidadExplorador block={block} />;
    case "fabrica-riesgos-explorador":
      return <FabricaRiesgosExplorador block={block} />;
    case "reciclaje-energia-explorador":
      return <ReciclajeEnergiaExplorador block={block} />;
    case "maquina-desmontaje-explorador":
      return <MaquinaDesmontajeExplorador block={block} />;
    case "poleas-correas-explorador":
      return <PoleasCorreasExplorador block={block} />;
    case "engranajes-explorador":
      return <EngranajesExplorador block={block} />;
    case "bicicleta-explorador":
      return <BicicletaExplorador block={block} />;
    case "sin-fin-explorador":
      return <SinFinExplorador block={block} />;
    case "biela-manivela-explorador":
      return <BielaManivelaExplorador block={block} />;
    case "leva-seguidor-explorador":
      return <LevaSeguidorExplorador block={block} />;
    case "cremallera-tornillo-explorador":
      return <CremalleraTornilloExplorador block={block} />;
    case "palanca-explorador":
      return <PalancaExplorador block={block} />;
    case "polipasto-explorador":
      return <PolipastoExplorador block={block} />;
    case "disco-giratorio-explorador":
      return <DiscoGiratorioExplorador block={block} />;
    case "motor-virtual-explorador":
      return <MotorVirtualExplorador block={block} />;
    case "reductor-rendimiento-explorador":
      return <ReductorRendimientoExplorador block={block} />;
    case "transmision-editor-explorador":
      return <TransmisionEditorExplorador block={block} />;
    case "carga-corriente-explorador":
      return <CargaCorrienteExplorador block={block} />;
    case "ohm-explorador":
      return <OhmExplorador block={block} />;
    case "circuito-basico-explorador":
      return <CircuitoBasicoExplorador block={block} />;
    case "resistencias-explorador":
      return <ResistenciasExplorador block={block} />;
    case "kirchhoff-explorador":
      return <KirchhoffExplorador block={block} />;
    case "consumo-energia-explorador":
      return <ConsumoEnergiaExplorador block={block} />;
    case "sobrecarga-circuito-explorador":
      return <SobrecargaCircuitoExplorador block={block} />;
    case "multimetro-explorador":
      return <MultimetroExplorador block={block} />;
    case "diagnostico-circuito-explorador":
      return <DiagnosticoCircuitoExplorador block={block} />;
    case "diodo-led-explorador":
      return <DiodoLedExplorador block={block} />;
    case "transistor-conmutador-explorador":
      return <TransistorConmutadorExplorador block={block} />;
    case "condensador-carga-explorador":
      return <CondensadorCargaExplorador block={block} />;
    case "reto-led-explorador":
      return <RetoLedExplorador block={block} />;
    case "ordenador-componentes-explorador":
      return <OrdenadorComponentesExplorador block={block} />;
    case "procesos-memoria-explorador":
      return <ProcesosMemoriaExplorador block={block} />;
    case "permisos-archivos-explorador":
      return <PermisosArchivosExplorador block={block} />;
    case "texto-binario-explorador":
      return <TextoBinarioExplorador block={block} />;
    case "tamano-archivo-explorador":
      return <TamanoArchivoExplorador block={block} />;
    case "diagrama-flujo-explorador":
      return <DiagramaFlujoExplorador block={block} />;
    case "python-traza-explorador":
      return <PythonTrazaExplorador block={block} />;
    case "tests-automaticos-explorador":
      return <TestsAutomaticosExplorador block={block} />;
    case "fabrica-modos-explorador":
      return <FabricaModosExplorador block={block} />;
    case "bloques-control-explorador":
      return <BloquesControlExplorador block={block} />;
    case "sensores-habitacion-explorador":
      return <SensoresHabitacionExplorador block={block} />;
    case "actuadores-explorador":
      return <ActuadoresExplorador block={block} />;
    case "placa-virtual-explorador":
      return <PlacaVirtualExplorador block={block} />;
    case "senal-umbral-explorador":
      return <SenalUmbralExplorador block={block} />;
    case "compuertas-alarma-explorador":
      return <CompuertasAlarmaExplorador block={block} />;
    case "termostato-lazo-explorador":
      return <TermostatoLazoExplorador block={block} />;
    case "linea-clasificacion-explorador":
      return <LineaClasificacionExplorador block={block} />;
    case "robot-cuadricula-explorador":
      return <RobotCuadriculaExplorador block={block} />;
    case "indicadores-decision-explorador":
      return <IndicadoresDecisionExplorador block={block} />;
    case "mapa-recursos-explorador":
      return <MapaRecursosExplorador block={block} />;
    case "edificio-eficiencia-explorador":
      return <EdificioEficienciaExplorador block={block} />;
    case "producto-impacto-explorador":
      return <ProductoImpactoExplorador block={block} />;
    case "economia-circular-explorador":
      return <EconomiaCircularExplorador block={block} />;
    case "parque-renovable-explorador":
      return <ParqueRenovableExplorador block={block} />;
    case "acv-explorador":
      return <AcvExplorador block={block} />;
    case "grupos-afectados-explorador":
      return <GruposAfectadosExplorador block={block} />;
    case "analisis-objeto-explorador":
      return <AnalisisObjetoExplorador block={block} />;
    case "linea-tiempo-explorador":
      return <LineaTiempoExplorador block={block} />;
    case "presupuesto-explorador":
      return <PresupuestoExplorador block={block} />;
    case "reparto-tareas-explorador":
      return <RepartoTareasExplorador block={block} />;
    case "fuente-fiable-explorador":
      return <FuenteFiableExplorador block={block} />;
    case "trazados-basicos-explorador":
      return <TrazadosBasicosExplorador block={block} />;
    case "acotacion-explorador":
      return <AcotacionExplorador block={block} />;
    case "escala-dibujo-explorador":
      return <EscalaDibujoExplorador block={block} />;
    case "vistas-pieza-explorador":
      return <VistasPiezaExplorador block={block} />;
    case "perspectiva-explorador":
      return <PerspectivaExplorador block={block} />;
    case "ensayo-material-explorador":
      return <EnsayoMaterialExplorador block={block} />;
    case "materiales-propiedades-explorador":
      return <PropiedadesBarrasExplorador block={block} />;
    case "madera-derivados-explorador":
      return <MaderaDerivadosExplorador block={block} />;
    case "metales-prueba-explorador":
      return <MetalesPruebaExplorador block={block} />;
    case "plastico-calor-explorador":
      return <PlasticoCalorExplorador block={block} />;
    case "seleccion-material-eso-explorador":
      return <SeleccionMaterialEsoExplorador block={block} />;
    case "taller-peligros-explorador":
      return <TallerPeligrosExplorador block={block} />;
    case "contenedores-reciclaje-explorador":
      return <ContenedoresReciclajeExplorador block={block} />;
    case "esfuerzos-barra-explorador":
      return <EsfuerzosBarraExplorador block={block} />;
    case "viga-flexion-explorador":
      return <VigaFlexionExplorador block={block} />;
    case "estabilidad-explorador":
      return <EstabilidadExplorador block={block} />;
    case "triangulacion-explorador":
      return <TriangulacionExplorador block={block} />;
    case "puentes-tipos-explorador":
      return <PuentesTiposExplorador block={block} />;
    case "ensayo-puente-explorador":
      return <EnsayoPuenteExplorador block={block} />;
    case "movimientos-explorador":
      return <MovimientosExplorador block={block} />;
    case "palanca-equilibrio-explorador":
      return <PalancaEquilibrioExplorador block={block} />;
    case "poleas-aparejo-explorador":
      return <PoleasAparejoExplorador block={block} />;
    case "rueda-eje-explorador":
      return <RuedaEjeExplorador block={block} />;
    case "engranajes-eso-explorador":
      return <EngranajesEsoExplorador block={block} />;
    case "tren-engranajes-explorador":
      return <TrenEngranajesExplorador block={block} />;
    case "bici-marchas-explorador":
      return <BiciMarchasExplorador block={block} />;
    case "conductores-aislantes-explorador":
      return <ConductoresAislantesExplorador block={block} />;
    case "circuito-simple-explorador":
      return <CircuitoSimpleExplorador block={block} />;
    case "simbolos-electricos-explorador":
      return <SimbolosElectricosExplorador block={block} />;
    case "control-luz-explorador":
      return <ControlLuzExplorador block={block} />;
    case "serie-paralelo-explorador":
      return <SerieParaleloExplorador block={block} />;
    case "montaje-circuito-explorador":
      return <MontajeCircuitoExplorador block={block} />;
    case "seguridad-electrica-explorador":
      return <SeguridadElectricaExplorador block={block} />;
    case "algoritmo-ordena-explorador":
      return <AlgoritmoOrdenaExplorador block={block} />;
    case "programa-bloques-explorador":
      return <ProgramaBloquesExplorador block={block} />;
    case "flujo-sencillo-explorador":
      return <FlujoSencilloExplorador block={block} />;
    case "variables-cajas-explorador":
      return <VariablesCajasExplorador block={block} />;
    case "condiciones-explorador":
      return <CondicionesExplorador block={block} />;
    case "depura-programa-explorador":
      return <DepuraProgramaExplorador block={block} />;
    case "huella-producto-explorador":
      return <HuellaProductoExplorador block={block} />;
    case "consumo-habitos-explorador":
      return <ConsumoHabitosExplorador block={block} />;
    case "ahorro-energia-explorador":
      return <AhorroEnergiaExplorador block={block} />;
    case "tiempo-descomposicion-explorador":
      return <TiempoDescomposicionExplorador block={block} />;
    case "lineal-circular-eso-explorador":
      return <LinealCircularEsoExplorador block={block} />;
    case "rampa-accesibilidad-explorador":
      return <RampaAccesibilidadExplorador block={block} />;
    case "dispositivo-componentes-explorador":
      return <DispositivoComponentesExplorador block={block} />;
    case "diagnostico-tecnico-explorador":
      return <DiagnosticoTecnicoExplorador block={block} />;
    case "capacidad-almacenamiento-explorador":
      return <CapacidadAlmacenamientoExplorador block={block} />;
    case "copia-seguridad-explorador":
      return <CopiaSeguridadExplorador block={block} />;
    case "tiempo-descarga-explorador":
      return <TiempoDescargaExplorador block={block} />;
    case "busqueda-operadores-explorador":
      return <BusquedaOperadoresExplorador block={block} />;
    case "contrasena-fortaleza-explorador":
      return <ContrasenaFortalezaExplorador block={block} />;
    case "situaciones-digitales-explorador":
      return <SituacionesDigitalesExplorador block={block} />;
    case "licencias-cc-explorador":
      return <LicenciasCcExplorador block={block} />;
    case "cad-placa-explorador":
      return <CadPlacaExplorador block={block} />;
    case "extrusion-explorador":
      return <ExtrusionExplorador block={block} />;
    case "diapositiva-legible-explorador":
      return <DiapositivaLegibleExplorador block={block} />;
    case "clasificador-ia-explorador":
      return <ClasificadorIaExplorador block={block} />;
    case "app-eventos-explorador":
      return <AppEventosExplorador block={block} />;
    case "eso2-analogia-agua-explorador":
      return <AnalogiaAguaExplorador block={block} />;
    case "eso2-ohm-incognita-explorador":
      return <OhmIncognitaExplorador block={block} />;
    case "eso2-factura-explorador":
      return <FacturaExplorador block={block} />;
    case "eso2-serie-paralelo-explorador":
      return <SerieParaleloCalcExplorador block={block} />;
    case "eso2-mixto-explorador":
      return <MixtoExplorador block={block} />;
    case "eso2-polimetro-explorador":
      return <PolimetroExplorador block={block} />;
    case "eso2-fallo-explorador":
      return <FalloCircuitoExplorador block={block} />;
    case "eso2-tension-explorador":
      return <TensionExplorador block={block} />;
    case "eso2-perfil-canto-explorador":
      return <PerfilCantoExplorador block={block} />;
    case "eso2-ventaja-mecanica-explorador":
      return <VentajaMecanicaExplorador block={block} />;
    case "eso2-tren-transmision-explorador":
      return <TrenTransmisionExplorador block={block} />;
    case "eso2-poleas-correas-explorador":
      return <PoleasCorreasCalcExplorador block={block} />;
    case "eso2-transformacion-explorador":
      return <TransformacionExplorador block={block} />;
    case "eso2-elevador-explorador":
      return <ElevadorExplorador block={block} />;
    case "eso2-traza-explorador":
      return <TrazaExplorador block={block} />;
    case "eso2-tipos-datos-explorador":
      return <TiposDatosExplorador block={block} />;
    case "eso2-operadores-explorador":
      return <OperadoresExplorador block={block} />;
    case "eso2-funcion-explorador":
      return <FuncionProgramaExplorador block={block} />;
    case "eso2-pruebas-explorador":
      return <PruebasExplorador block={block} />;
    case "eso2-adivina-explorador":
      return <AdivinaExplorador block={block} />;
    case "eso2-pieza-vistas-explorador":
      return <PiezaVistasExplorador block={block} />;
    case "eso2-escala-conversion-explorador":
      return <EscalaConversionExplorador block={block} />;
    case "eso2-conica-explorador":
      return <PerspectivaConicaExplorador block={block} />;
    case "eso2-plano-vivienda-explorador":
      return <PlanoViviendaExplorador block={block} />;
    case "eso2-cad-comandos-explorador":
      return <CadComandosExplorador block={block} />;
    case "eso2-solido-operaciones-explorador":
      return <SolidoOperacionesExplorador block={block} />;
    case "eso2-lamina-explorador":
      return <LaminaExplorador block={block} />;
    case "eso2-densidad-explorador":
      return <DensidadMaterialesExplorador block={block} />;
    case "eso2-curva-traccion-explorador":
      return <CurvaTraccionExplorador block={block} />;
    case "eso2-despiece-tablero-explorador":
      return <DespieceTableroExplorador block={block} />;
    case "eso2-matriz-decision-explorador":
      return <MatrizDecisionMaterialesExplorador block={block} />;
    case "eso2-tecnica-taller-explorador":
      return <TecnicaTallerExplorador block={block} />;
    case "eso2-calibre-explorador":
      return <CalibreExplorador block={block} />;
    case "eso2-impresion3d-explorador":
      return <Impresion3dEsoExplorador block={block} />;
    case "eso2-requisitos-explorador":
      return <RequisitosProyectoExplorador block={block} />;
    case "eso2-scamper-explorador":
      return <ScamperExplorador block={block} />;
    case "eso2-seleccion-ideas-explorador":
      return <SeleccionIdeasExplorador block={block} />;
    case "eso2-gantt-explorador":
      return <GanttProyectoExplorador block={block} />;
    case "eso2-pruebas-prototipo-explorador":
      return <PruebasPrototipoExplorador block={block} />;
    case "eso2-memoria-explorador":
      return <MemoriaProyectoExplorador block={block} />;
    case "eso2-sistema-recursos-explorador":
      return <SistemaRecursosExplorador block={block} />;
    case "eso2-rutas-explorador":
      return <RutasExplorador block={block} />;
    case "eso2-hoja-calculo-explorador":
      return <HojaCalculoExplorador block={block} />;
    case "eso2-formato-imagen-explorador":
      return <FormatoImagenExplorador block={block} />;
    case "eso2-subida-nube-explorador":
      return <SubidaNubeExplorador block={block} />;
    case "eso2-tiempo-pantalla-explorador":
      return <TiempoPantallaExplorador block={block} />;
    /* industrial-tools */
    default:
      return null;
  }
}
