// industrial-imports
import { buildSetupLoop, buildPwmCiclo } from "@/components/lesson/anim/scenes/industrial/teceso3-robotica";
import { buildLazoCerradoEso3 } from "@/components/lesson/anim/scenes/industrial/teceso3-control";
import { buildDiodoSentido, buildTransistorLlave } from "@/components/lesson/anim/scenes/industrial/teceso3-electronica";
import { buildSincronizacionNube } from "@/components/lesson/anim/scenes/industrial/teceso2-digital";
import { buildCicloDiseno } from "@/components/lesson/anim/scenes/industrial/teceso2-proyecto";
import { buildCurvaTraccion } from "@/components/lesson/anim/scenes/industrial/teceso2-materiales";
import { buildVistasEuropeo } from "@/components/lesson/anim/scenes/industrial/teceso2-dibujo";
import { buildBucleTraza } from "@/components/lesson/anim/scenes/industrial/teceso2-programacion";
import { buildBielaManivela } from "@/components/lesson/anim/scenes/industrial/teceso2-mecanica";
import { buildOhmAgua, buildMixtoReduccion } from "@/components/lesson/anim/scenes/industrial/teceso2-electricidad";
import { buildExtrusionPerfil } from "@/components/lesson/anim/scenes/industrial/teceso1-comunicacion";
import { buildCapasEntornoDigital, buildPaquetesRed } from "@/components/lesson/anim/scenes/industrial/teceso1-digital";
import { buildCicloVidaProductoEso, buildJerarquiaResiduos } from "@/components/lesson/anim/scenes/industrial/teceso1-sostenible";
import { buildAlgoritmoReceta, buildDiagramaFlujoSimbolos, buildBucleRepeticionSimple, buildVariableCaja } from "@/components/lesson/anim/scenes/industrial/teceso1-computacional";
import { buildElectronesCorriente, buildCircuitoComponentes, buildSerieParaleloCamino, buildCortocircuitoFusible } from "@/components/lesson/anim/scenes/industrial/teceso1-electricidad";
import { buildMovimientosTipos, buildPalancaLey, buildPoleaFijaMovil } from "@/components/lesson/anim/scenes/industrial/teceso1-mecanismos";
import { buildEsfuerzosTipos, buildTrianguloRigido, buildArcoDescarga, buildCaminoCargas } from "@/components/lesson/anim/scenes/industrial/teceso1-estructuras";
import { buildMateriasPrimasProceso, buildContrachapadoCapas, buildAleacionMezcla, buildCicloReciclaje } from "@/components/lesson/anim/scenes/industrial/teceso1-materiales";
import { buildTrazoParalelaEscuadra, buildAcotarPiezaPasos, buildVistasProyeccion, buildCaballeraPasos, buildIsometricaPasos, buildBocetoCroquisPlano, buildEscalaReduccion } from "@/components/lesson/anim/scenes/industrial/teceso1-grafica";
import { buildFasesProyectoEso, buildCienciaTecnicaTecnologia } from "@/components/lesson/anim/scenes/industrial/teceso1-proceso";
import { buildTripleSostenibilidad, buildCicloVidaFases, buildEconomiaLinealCircular } from "@/components/lesson/anim/scenes/industrial/tec1-sostenible";
import { buildSistemaControlTermostato, buildSensorDivisorTension, buildHisteresisComparador, buildSecuenciaClasificacion } from "@/components/lesson/anim/scenes/industrial/tec1-automaticos";
import { buildCicloInstruccion, buildBucleIteraciones } from "@/components/lesson/anim/scenes/industrial/tec1-programacion";
import { buildCargaMovilCircuito, buildSerieParaleloReparto, buildKirchhoffNodoMalla } from "@/components/lesson/anim/scenes/industrial/tec1-circuitos";
import { buildTransmisionFlujo, buildCorreaAbiertaCruzada, buildEngranajesGiro, buildBielaManivelaCiclo, buildPalancaGeneros } from "@/components/lesson/anim/scenes/industrial/tec1-mecanismos";
import { buildEscalaMaterialZoom, buildPolimeroCadenas, buildConformadoProcesos } from "@/components/lesson/anim/scenes/industrial/tec1-materiales";
import { buildProcesoDisenoCiclo, buildGanttCaminoCritico } from "@/components/lesson/anim/scenes/industrial/tec1-proyectos";
import { buildPoblacionMuestra, buildTiposMuestreo, buildTclMedias, buildContrasteRegion } from "@/components/lesson/anim/scenes/ccss2-estimacion";
import { buildSemiplanoPrueba, buildRectasNivel } from "@/components/lesson/anim/scenes/ccss2-programacion";
import { buildPascalBinomio } from "@/components/lesson/anim/scenes/bach2-prob";
import { buildPrimitivaFamilia, buildRiemannSumas, buildTeoremaFundamental, buildAreaEntreCurvas, buildSolidoRevolucion } from "@/components/lesson/anim/scenes/bach2-integrales";
import { buildBolzanoBiseccion, buildRolleLagrange } from "@/components/lesson/anim/scenes/bach2-analisis";
import { buildProyeccionPuntoPlano3d, buildDistanciaPuntoRecta3d, buildDistanciaRectasCruzan3d } from "@/components/lesson/anim/scenes/bach2-metrica";
import { buildRectaEspacio3d, buildPlanoTresPuntos3d, buildRectasPosiciones3d } from "@/components/lesson/anim/scenes/bach2-rectas-planos";
import { buildVectorComponentes3d, buildVectoresSuma3d, buildProductoEscalarProyeccion, buildProductoVectorial3d, buildParalelepipedoVolumen } from "@/components/lesson/anim/scenes/bach2-vectores";
import { buildSistemaFormaMatricial, buildSistemaGaussAmpliada, buildRoucheCasos } from "@/components/lesson/anim/scenes/bach2-sistemas";
import { buildDeterminanteSarrus, buildMatrizMenorAdjunto, buildDeterminanteAdjuntos, buildDeterminanteGauss } from "@/components/lesson/anim/scenes/bach2-determinantes";
import { buildMatrizProducto, buildMatrizGaussJordan, buildMatrizRangoGauss, buildMatrizTraspuesta, buildGrafoAdyacencia, buildMatrizElementos, buildMatrizTipos } from "@/components/lesson/anim/scenes/bach2-matrices";
import { buildCuantiaMonedas, buildEsperanzaJuego, buildBinomialForma, buildCampanaNormal, buildTipificacionNormal, buildIntervaloConfianza } from "@/components/lesson/anim/scenes/ccss1-distribuciones";
import { buildTrianguloPascal } from "@/components/lesson/anim/scenes/ccss1-combinatoria";
import { buildInteresCompuestoBarras, buildAnualidadCapitalizacion, buildAnualidadAmortizacion } from "@/components/lesson/anim/scenes/ccss1-finanzas";
import { buildEstadisticaConceptos } from "@/components/lesson/anim/scenes/bach1-estadistica";
import { buildBayesFrecuencias } from "@/components/lesson/anim/scenes/bach1-probabilidad";
import { buildSecanteTangente, buildDerivadaSigno, buildExtremosCriterios } from "@/components/lesson/anim/scenes/bach1-derivadas";
import { buildLimiteAproximacion, buildAsintotasTipos } from "@/components/lesson/anim/scenes/bach1-limites";
import { buildProyeccionVector } from "@/components/lesson/anim/scenes/bach1-geo";
import { buildRadianArco, buildCirculoGoniometrico } from "@/components/lesson/anim/scenes/bach1-trig";
import { buildSerieGeometricaSaltos } from "@/components/lesson/anim/scenes/bach1-sucesiones";
import { buildGaussEliminacion } from "@/components/lesson/anim/scenes/bach1-sistemas";
import { buildComplejoSumaVectores, buildComplejoGiroI, buildComplejoPolar, buildComplejoProductoPolar, buildComplejoRaices } from "@/components/lesson/anim/scenes/bach1-complejos";
import { buildLogaritmoExponente, buildLogaritmoProducto } from "@/components/lesson/anim/scenes/bach1-logaritmos";
import { buildArbolConteo, buildPermutacionesArbol, buildCombinacionesDividir } from "@/components/lesson/anim/scenes/eso4b-comb";
import { buildTrigTrianguloRazones, buildTrigSemejantes, buildTrigNotables, buildTrigAlturaArbol } from "@/components/lesson/anim/scenes/eso4b-trig";
import { buildDivisionPolinomios, buildRuffiniTabla } from "@/components/lesson/anim/scenes/eso4b-polinomios";
import { buildIntervaloRecta, buildSemirrectaRecta } from "@/components/lesson/anim/scenes/eso4b-reales";
import { buildLazoAbiertoCerrado, buildRespuestaEscalon, buildPolosPlanoS, buildReduccionBloques, buildOffsetProporcional, buildLaplaceDominios } from "@/components/lesson/anim/scenes/industrial/control";
import { buildConversionBases, buildLogicaNiveles, buildPuertasLogicasBasicas, buildPuertasUniversales, buildKarnaughAgrupar, buildNandImplementacion, buildMuxDecoder, buildSumadorBinario } from "@/components/lesson/anim/scenes/industrial/logica";
import { buildSenalAnalogicaDigital, buildSensorInductivo, buildOpticaSensor, buildGalgaDeformacion, buildEncoderTacometro, buildPresionManometros, buildTemperaturaCaptadores, buildOperacionalInversor, buildAceleradorAsr } from "@/components/lesson/anim/scenes/industrial/sensores";
import { buildSecuencialIntro, buildBiestableRs, buildBiestableJkDT, buildRegistroDesplazamiento, buildCableadoLadder, buildGrafoBimodal, buildTemporizadoresCronograma, buildEstrellaTrianguloControl } from "@/components/lesson/anim/scenes/industrial/secuencial";
import { buildViscosidadPlacas, buildFlujoLaminarTurbulento, buildPrensaHidraulica, buildContinuidadBernoulli, buildBombaEngranajes, buildLimitadoraDescarga, buildValvula43Cilindro, buildRegulacionCaudalHid } from "@/components/lesson/anim/scenes/industrial/hidraulica";
import { buildHumedadCompresion, buildCompresorEmbolo, buildRedDistribucion, buildCilindrosEfecto, buildValvula32, buildEstrangulacion, buildEspacioFase, buildMandoDoble } from "@/components/lesson/anim/scenes/industrial/neumatica";
import { buildOersted, buildHilosParalelos, buildLorentzCarga, buildEspiraMomento, buildFaradayVarilla, buildMotorCcBloques, buildCampoGiratorio, buildEstrellaTriangulo, buildMonofasicoArranque } from "@/components/lesson/anim/scenes/industrial/electricos";
import { buildProcesosCamino, buildMotorFrigorificaFocos, buildCarnotCiclo, buildCarnotFrigorifico, buildRankineCircuito, buildBraytonCircuito, buildMotor4Tiempos, buildOttoDieselPV, buildTurbocompresorFlujo, buildFrigorificoCircuito, buildBombaCalorInversion } from "@/components/lesson/anim/scenes/industrial/termicos";
import { buildAtomoIsotopos, buildEnlaceCurvaEnergia, buildIonNaCl, buildCovalenteMultiple, buildHibridacionSp3, buildMetalicoNube, buildAguaPuenteH, buildCristalAmorfo } from "@/components/lesson/anim/scenes/industrial/estructura";
import { buildElasticoPlastico, buildVarillaTraccion, buildDiagramaTraccion, buildBrinellHuella, buildRockwellProfundidad, buildPenduloCharpy, buildFatigaCiclos } from "@/components/lesson/anim/scenes/industrial/ensayos";
import { buildPlanoInclinado, buildTrabajoAreaCurva, buildResorteTrabajo, buildRodaduraCarrera, buildPrimerPrincipio, buildParTrabajo, buildPistonTrabajo, buildPresaTurbina } from "@/components/lesson/anim/scenes/industrial/maquinas";
import { buildAustenitaMartensita, buildJominyEnsayo, buildTttLectura, buildCiclosTratamiento, buildCementacionDifusion, buildPilaCorrosion, buildAireacionDiferencial, buildProteccionCatodica, buildDesgasteAsperezas, buildCavitacion } from "@/components/lesson/anim/scenes/industrial/tratamientos";
import { buildVidrioRed, buildPrensadoSinterizado, buildBarbotina, buildPolimerizacionAdicion, buildPolimerizacionCondensacion, buildPolimerosCalor, buildExtrusionTornillo, buildDepositoSeguridad } from "@/components/lesson/anim/scenes/industrial/materiales";
import { buildRedSolucionSolida, buildCurvaEnfriamiento, buildSolidificacionEtapas, buildReglaPalanca, buildEutecticoEnfriamiento, buildFeCEnfriamiento, buildGrafitoFundiciones } from "@/components/lesson/anim/scenes/industrial/aleaciones";
import type { SlideAnimId, SlideAnimParams } from "@/lib/lesson/types";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { buildAscensorEnteros } from "@/components/lesson/anim/scenes/ascensor-enteros";
import { buildCompararEnteros } from "@/components/lesson/anim/scenes/comparar-enteros";
import { buildDivisionInversa } from "@/components/lesson/anim/scenes/division-inversa";
import { buildFichasOpuestos } from "@/components/lesson/anim/scenes/fichas-opuestos";
import { buildParentesisSignos } from "@/components/lesson/anim/scenes/parentesis-signos";
import { buildProductoSignos } from "@/components/lesson/anim/scenes/producto-signos";
import { buildRectaEnteros } from "@/components/lesson/anim/scenes/recta-enteros";
import { buildRestaOpuesto } from "@/components/lesson/anim/scenes/resta-opuesto";
import { buildSumaRecta } from "@/components/lesson/anim/scenes/suma-recta";
import { buildValorAbsoluto } from "@/components/lesson/anim/scenes/valor-absoluto";
import { buildAreaDistributiva } from "@/components/lesson/anim/scenes/area-distributiva";
import { buildCribaEratostenes } from "@/components/lesson/anim/scenes/criba-eratostenes";
import { buildCriterioAlternada } from "@/components/lesson/anim/scenes/criterio-alternada";
import { buildCriterioEjemplos } from "@/components/lesson/anim/scenes/criterio-ejemplos";
import { buildCriterioSumaCifras } from "@/components/lesson/anim/scenes/criterio-suma-cifras";
import { buildDescomposicionPrimos } from "@/components/lesson/anim/scenes/descomposicion-primos";
import { buildDivisibilidadGrupos } from "@/components/lesson/anim/scenes/divisibilidad-grupos";
import { buildDivisoresRectangulos } from "@/components/lesson/anim/scenes/divisores-rectangulos";
import { buildMcdCortes } from "@/components/lesson/anim/scenes/mcd-cortes";
import { buildMultiplosSaltos } from "@/components/lesson/anim/scenes/multiplos-saltos";
import { buildTablaExponentes } from "@/components/lesson/anim/scenes/tabla-exponentes";
import { buildDecimalCanje } from "@/components/lesson/anim/scenes/decimal-canje";
import { buildDecimalPosicion } from "@/components/lesson/anim/scenes/decimal-posicion";
import { buildEgipcioAditivo } from "@/components/lesson/anim/scenes/egipcio-aditivo";
import { buildExprReescritura } from "@/components/lesson/anim/scenes/expr-reescritura";
import { buildRedondeoRecta } from "@/components/lesson/anim/scenes/redondeo-recta";
import { buildRepartoAgrupar } from "@/components/lesson/anim/scenes/reparto-agrupar";
import { buildRestaDiferencia } from "@/components/lesson/anim/scenes/resta-diferencia";
import { buildRomanoResta } from "@/components/lesson/anim/scenes/romano-resta";
import { buildComaPotencias10 } from "@/components/lesson/anim/scenes/coma-potencias10";
import { buildCompararDecimales } from "@/components/lesson/anim/scenes/comparar-decimales";
import { buildDecimalColumna } from "@/components/lesson/anim/scenes/decimal-columna";
import { buildDecimalProducto } from "@/components/lesson/anim/scenes/decimal-producto";
import { buildDecimalZoom } from "@/components/lesson/anim/scenes/decimal-zoom";
import { buildDivisionComaDivisor } from "@/components/lesson/anim/scenes/division-coma-divisor";
import { buildDivisionDecimal } from "@/components/lesson/anim/scenes/division-decimal";
import { buildRedondeoDecimal } from "@/components/lesson/anim/scenes/redondeo-decimal";
import { buildTablaDecimal } from "@/components/lesson/anim/scenes/tabla-decimal";

import { buildCuadradosArea } from "@/components/lesson/anim/scenes/cuadrados-area";
import { buildCuboAgua } from "@/components/lesson/anim/scenes/cubo-agua";
import { buildEscalaLongitudes } from "@/components/lesson/anim/scenes/escala-longitudes";
import { buildEscaleraUnidades } from "@/components/lesson/anim/scenes/escalera-unidades";
import { buildM2Dm2 } from "@/components/lesson/anim/scenes/m2-dm2";
import { buildMedirUnidad } from "@/components/lesson/anim/scenes/medir-unidad";
import { buildMeridianoMetro } from "@/components/lesson/anim/scenes/meridiano-metro";
import { buildTablaUnidades } from "@/components/lesson/anim/scenes/tabla-unidades";
import { buildFraccionEquivalente } from "@/components/lesson/anim/scenes/fraccion-equivalente";
import { buildFraccionOperador } from "@/components/lesson/anim/scenes/fraccion-operador";
import { buildFraccionPartes } from "@/components/lesson/anim/scenes/fraccion-partes";
import { buildFraccionRecta } from "@/components/lesson/anim/scenes/fraccion-recta";
import { buildFraccionBarrasSuma } from "@/components/lesson/anim/scenes/fraccion-barras-suma";
import { buildFraccionCabe } from "@/components/lesson/anim/scenes/fraccion-cabe";
import { buildFraccionCombinada } from "@/components/lesson/anim/scenes/fraccion-combinada";
import { buildFraccionGastoResto } from "@/components/lesson/anim/scenes/fraccion-gasto-resto";
import { buildFraccionDeFraccion } from "@/components/lesson/anim/scenes/fraccion-de-fraccion";
import { buildSimplificarIrreducible } from "@/components/lesson/anim/scenes/simplificar-irreducible";
import { buildSimplificarFactores } from "@/components/lesson/anim/scenes/simplificar-factores";

import { buildAumentoBarra } from "@/components/lesson/anim/scenes/aumento-barra";
import { buildCuadriculaPorcentaje } from "@/components/lesson/anim/scenes/cuadricula-porcentaje";
import { buildReduccionUnidad } from "@/components/lesson/anim/scenes/reduccion-unidad";
import { buildReglaTresProducto } from "@/components/lesson/anim/scenes/regla-tres-producto";
import { buildPorcentajeMental } from "@/components/lesson/anim/scenes/porcentaje-mental";
import { buildFactorCambio } from "@/components/lesson/anim/scenes/factor-cambio";
import { buildReglaTresCruz } from "@/components/lesson/anim/scenes/regla-tres-cruz";
import { buildTablaRazon } from "@/components/lesson/anim/scenes/tabla-razon";

import { buildBalanzaEcuacion } from "@/components/lesson/anim/scenes/balanza-ecuacion";
import { buildMaquinaFuncion } from "@/components/lesson/anim/scenes/maquina-funcion";
import { buildSemejantesAgrupar } from "@/components/lesson/anim/scenes/semejantes-agrupar";
import { buildLetrasValores } from "@/components/lesson/anim/scenes/letras-valores";
import { buildEnunciadoExpresion } from "@/components/lesson/anim/scenes/enunciado-expresion";
import { buildCampoPerimetroArea } from "@/components/lesson/anim/scenes/campo-perimetro-area";
import { buildMonomioPartes } from "@/components/lesson/anim/scenes/monomio-partes";
import { buildMonomioProducto } from "@/components/lesson/anim/scenes/monomio-producto";
import { buildMonomioCociente } from "@/components/lesson/anim/scenes/monomio-cociente";
import { buildEcuacionIdentidad } from "@/components/lesson/anim/scenes/ecuacion-identidad";
import { buildComprobarSolucion } from "@/components/lesson/anim/scenes/comprobar-solucion";
import { buildPasosProblema } from "@/components/lesson/anim/scenes/pasos-problema";

import { buildRectaSemirrecta } from "@/components/lesson/anim/scenes/recta-semirrecta";
import { buildPosicionesRectas } from "@/components/lesson/anim/scenes/posiciones-rectas";
import { buildMediatrizEquidistan } from "@/components/lesson/anim/scenes/mediatriz-equidistan";
import { buildMediatrizCompas } from "@/components/lesson/anim/scenes/mediatriz-compas";
import { buildBisectrizEquidistan } from "@/components/lesson/anim/scenes/bisectriz-equidistan";
import { buildBisectrizCompas } from "@/components/lesson/anim/scenes/bisectriz-compas";
import { buildAnguloElementos } from "@/components/lesson/anim/scenes/angulo-elementos";
import { buildAngulosOpuestos } from "@/components/lesson/anim/scenes/angulos-opuestos";
import { buildParalelasSecante } from "@/components/lesson/anim/scenes/paralelas-secante";
import { buildGradoMinuto } from "@/components/lesson/anim/scenes/grado-minuto";
import { buildAngulosColumna } from "@/components/lesson/anim/scenes/angulos-columna";
import { buildCajaBigotes } from "@/components/lesson/anim/scenes/caja-bigotes";
import { buildDispersionPuntos } from "@/components/lesson/anim/scenes/dispersion-puntos";
import { buildFuncionEsNoEs } from "@/components/lesson/anim/scenes/funcion-es-no-es";
import { buildFuncionTemperatura } from "@/components/lesson/anim/scenes/funcion-temperatura";
import { buildFuncionTramosExtremos } from "@/components/lesson/anim/scenes/funcion-tramos-extremos";
import { buildRectaPendiente } from "@/components/lesson/anim/scenes/recta-pendiente";
import { buildArquimedesVolumenes } from "@/components/lesson/anim/scenes/arquimedes-volumenes";
import { buildCuboDm3 } from "@/components/lesson/anim/scenes/cubo-dm3";
import { buildDesarrolloCilindro } from "@/components/lesson/anim/scenes/desarrollo-cilindro";
import { buildDesarrolloCono } from "@/components/lesson/anim/scenes/desarrollo-cono";
import { buildDesarrolloOrtoedro } from "@/components/lesson/anim/scenes/desarrollo-ortoedro";
import { buildEsferaCilindro } from "@/components/lesson/anim/scenes/esfera-cilindro";
import { buildPitagorasCuadrados } from "@/components/lesson/anim/scenes/pitagoras-cuadrados";
import { buildSemejanzaFiguras } from "@/components/lesson/anim/scenes/semejanza-figuras";
import { buildTalesSombras } from "@/components/lesson/anim/scenes/tales-sombras";
import { buildTriangulo180 } from "@/components/lesson/anim/scenes/triangulo-180";
import { buildPoligonoTriangulos } from "@/components/lesson/anim/scenes/poligono-triangulos";
import { buildTrianguloAltura, buildTrianguloMediana, buildTriangulosClasificacion } from "@/components/lesson/anim/scenes/triangulos";
import { buildCuadrilaterosFamilia, buildTrapecioTipos } from "@/components/lesson/anim/scenes/cuadrilateros";
import { buildPoligonoApotema, buildPoligonoRegularCircunscrito } from "@/components/lesson/anim/scenes/poligono-regular";
import { buildCircunferenciaElementos, buildCircunferenciaRecta, buildCircunferenciasPosiciones } from "@/components/lesson/anim/scenes/circunferencia";
import { buildPiramideElementos, buildPoliedroElementos, buildPoliedrosRegulares, buildPrismaElementos } from "@/components/lesson/anim/scenes/solidos";
import { buildAreaCirculo, buildAreaParalelogramo, buildAreaPerimetro, buildAreaPoligonoRegular, buildAreaPoligonoTriangulos, buildAreaRectangulo, buildAreaRombo, buildAreaTrapecio, buildAreaTriangulo, buildAreaTrianguloRectangulo, buildCoronaCircular, buildLongitudPi } from "@/components/lesson/anim/scenes/areas";
import { buildCuadrantesSignos, buildDiagramaPuntos, buildDiagramaSectores, buildGraficaLlamadas, buildGraficaTramos, buildGraficoBarrasHistograma, buildMediaMedianaModa, buildMedianaPar, buildPlanoCartesiano, buildTablaFrecuencias } from "@/components/lesson/anim/scenes/estadistica";
import { buildEspacioMuestral, buildExpDeterministaAleatorio, buildFrecuenciasDado, buildGrandesNumeros, buildLaplaceDado, buildSucesoUnionInterseccion, buildSucesosConjuntos } from "@/components/lesson/anim/scenes/probabilidad";
import { buildRevolucionGiro } from "@/components/lesson/anim/scenes/revolucion-giro";
import { buildErrorAproximacion } from "@/components/lesson/anim/scenes/error-aproximacion";
import { buildNotacionCientifica } from "@/components/lesson/anim/scenes/notacion-cientifica";
import { buildProgresionPasos } from "@/components/lesson/anim/scenes/progresion-pasos";
import { buildPotenciasFactores } from "@/components/lesson/anim/scenes/potencias-factores";
import { buildPotenciasExpNegativo } from "@/components/lesson/anim/scenes/potencias-exp-negativo";
import { buildPotenciaSigno } from "@/components/lesson/anim/scenes/potencia-signo";
import { buildPotenciaDePotencia } from "@/components/lesson/anim/scenes/potencia-de-potencia";
import { buildPotenciaDeProducto } from "@/components/lesson/anim/scenes/potencia-de-producto";
import { buildPotenciaFraccionInversa } from "@/components/lesson/anim/scenes/potencia-fraccion-inversa";
import { buildFraccionMixta } from "@/components/lesson/anim/scenes/fraccion-mixta";
import { buildDecimalPeriodicoRestos } from "@/components/lesson/anim/scenes/decimal-periodico-restos";
import { buildGeneratrizPeriodico } from "@/components/lesson/anim/scenes/generatriz-periodico";
import { buildErrorRelativoComparar } from "@/components/lesson/anim/scenes/error-relativo-comparar";
import { buildAproximacionRaiz } from "@/components/lesson/anim/scenes/aproximacion-raiz";
import { buildNumeroOroConstruccion } from "@/components/lesson/anim/scenes/numero-oro-construccion";
import { buildPiCircunferencia } from "@/components/lesson/anim/scenes/pi-circunferencia";
import { buildConjuntosNumericos } from "@/components/lesson/anim/scenes/conjuntos-numericos";
import { buildRaizEnRecta } from "@/components/lesson/anim/scenes/raiz-en-recta";
import { buildRadicalPotencia } from "@/components/lesson/anim/scenes/radical-potencia";
import { buildRadicalExtraer } from "@/components/lesson/anim/scenes/radical-extraer";
import { buildRadicalesSemejantes } from "@/components/lesson/anim/scenes/radicales-semejantes";
import { buildRacionalizar } from "@/components/lesson/anim/scenes/racionalizar";
import { buildProporcionCompuesta } from "@/components/lesson/anim/scenes/proporcion-compuesta";
import { buildRepartoPartes } from "@/components/lesson/anim/scenes/reparto-partes";
import { buildMezclaTabla } from "@/components/lesson/anim/scenes/mezcla-tabla";
import { buildMovilEncuentro } from "@/components/lesson/anim/scenes/movil-encuentro";
import { buildInteresProporcional } from "@/components/lesson/anim/scenes/interes-proporcional";
import { buildPolinomiosColumna } from "@/components/lesson/anim/scenes/polinomios-columna";
import { buildProductoArea } from "@/components/lesson/anim/scenes/producto-area";
import { buildDenominadoresMcm } from "@/components/lesson/anim/scenes/denominadores-mcm";
import { buildProblemaBarras } from "@/components/lesson/anim/scenes/problema-barras";
import { buildHomoteciaProyeccion } from "@/components/lesson/anim/scenes/homotecia-proyeccion";
import { buildTalesParalelas } from "@/components/lesson/anim/scenes/tales-paralelas";
import { buildTroncoSemejanza } from "@/components/lesson/anim/scenes/tronco-semejanza";
import { buildVectorCoordenadas } from "@/components/lesson/anim/scenes/vector-coordenadas";
import { buildSumaVectores } from "@/components/lesson/anim/scenes/suma-vectores";
import { buildPuntoMedioDistancia } from "@/components/lesson/anim/scenes/punto-medio-distancia";
import { buildPerpendicularGiro } from "@/components/lesson/anim/scenes/perpendicular-giro";
import { buildVarianzaDesviaciones } from "@/components/lesson/anim/scenes/varianza-desviaciones";
import { buildCajaAtipico } from "@/components/lesson/anim/scenes/caja-atipico";
import { buildArbolUrna } from "@/components/lesson/anim/scenes/arbol-urna";
import { buildParabolaVertice } from "@/components/lesson/anim/scenes/parabola-vertice";
import { buildHiperbolaAsintotas } from "@/components/lesson/anim/scenes/hiperbola-asintotas";
import { buildPuntoPendiente } from "@/components/lesson/anim/scenes/punto-pendiente";
import { buildFuncionTrozos } from "@/components/lesson/anim/scenes/funcion-trozos";
import { buildReduccionSuma } from "@/components/lesson/anim/scenes/reduccion-suma";
import { buildInecuacionSigno } from "@/components/lesson/anim/scenes/inecuacion-signo";
import { buildNotacionOperacion } from "@/components/lesson/anim/scenes/notacion-operacion";
import { buildRacionalesZoom } from "@/components/lesson/anim/scenes/racionales-zoom";
import { buildRaizCuadrado } from "@/components/lesson/anim/scenes/raiz-cuadrado";
import { buildRaizEntreCuadrados } from "@/components/lesson/anim/scenes/raiz-entre-cuadrados";
import { buildSustitucionSistema } from "@/components/lesson/anim/scenes/sustitucion-sistema";
import { buildSistemaTest } from "@/components/lesson/anim/scenes/sistema-test";
import { buildProgresionComparar } from "@/components/lesson/anim/scenes/progresion-comparar";
import { buildRectaTablaPuntos } from "@/components/lesson/anim/scenes/recta-tabla-puntos";
import { buildRectaConstante } from "@/components/lesson/anim/scenes/recta-constante";
import { buildDominioRecorrido } from "@/components/lesson/anim/scenes/dominio-recorrido";
import { buildTablaFormula } from "@/components/lesson/anim/scenes/tabla-formula";
import { buildTarifasEscalones } from "@/components/lesson/anim/scenes/tarifas-escalones";
import { buildCuadradoDiferencia } from "@/components/lesson/anim/scenes/cuadrado-diferencia";
import { buildPolinomioTabla } from "@/components/lesson/anim/scenes/polinomio-tabla";
import { buildFactorComunArea } from "@/components/lesson/anim/scenes/factor-comun-area";
import { buildFraccionesOrden } from "@/components/lesson/anim/scenes/fracciones-orden";
import { buildFraccionTotal } from "@/components/lesson/anim/scenes/fraccion-total";
import { buildCantidadInicial } from "@/components/lesson/anim/scenes/cantidad-inicial";
import { buildPitagorasDemostracion } from "@/components/lesson/anim/scenes/pitagoras-demostracion";
import { buildCoordenadasGeograficas } from "@/components/lesson/anim/scenes/coordenadas-geograficas";
import { buildSumaGauss } from "@/components/lesson/anim/scenes/suma-gauss";
import { buildCuadradoSuma } from "@/components/lesson/anim/scenes/cuadrado-suma";
import { buildSumaPorDiferencia } from "@/components/lesson/anim/scenes/suma-por-diferencia";
import { buildParabolaRaices } from "@/components/lesson/anim/scenes/parabola-raices";
import { buildSistemaRectas } from "@/components/lesson/anim/scenes/sistema-rectas";
import { buildFuncionContinuidad } from "@/components/lesson/anim/scenes/funcion-continuidad";
import { buildFuncionTendenciaPeriodo } from "@/components/lesson/anim/scenes/funcion-tendencia-periodo";
import { buildPendienteDosPuntos } from "@/components/lesson/anim/scenes/pendiente-dos-puntos";
import { buildRectasEncuentro } from "@/components/lesson/anim/scenes/rectas-encuentro";
import { buildConicaLugar } from "@/components/lesson/anim/scenes/conica-lugar";
import { buildSectorCircular } from "@/components/lesson/anim/scenes/sector-circular";
import { buildHusosHorarios } from "@/components/lesson/anim/scenes/husos-horarios";

type Builder = (params: SlideAnimParams) => AnimBuild;

/** Lista canónica de animaciones disponibles para `{ kind: "anim", scene }`. */
export const SLIDE_ANIM_REGISTRY: Record<SlideAnimId, Builder> = {
  "egipcio-aditivo": (p) => buildEgipcioAditivo(p),
  "romano-resta": () => buildRomanoResta(),
  "decimal-canje": () => buildDecimalCanje(),
  "decimal-posicion": (p) => buildDecimalPosicion(p),
  "redondeo-recta": (p) => buildRedondeoRecta(p),
  "resta-diferencia": (p) => buildRestaDiferencia(p),
  "area-distributiva": (p) => buildAreaDistributiva(p),
  "reparto-agrupar": (p) => buildRepartoAgrupar(p),
  "expr-reescritura": (p) => buildExprReescritura(p),
  "criba-eratostenes": (p) => buildCribaEratostenes(p),
  "criterio-alternada": (p) => buildCriterioAlternada(p),
  "criterio-ejemplos": (p) => buildCriterioEjemplos(p),
  "criterio-suma-cifras": (p) => buildCriterioSumaCifras(p),
  "descomposicion-primos": (p) => buildDescomposicionPrimos(p),
  "divisibilidad-grupos": (p) => buildDivisibilidadGrupos(p),
  "divisores-rectangulos": (p) => buildDivisoresRectangulos(p),
  "mcd-cortes": (p) => buildMcdCortes(p),
  "multiplos-saltos": (p) => buildMultiplosSaltos(p),
  "tabla-exponentes": (p) => buildTablaExponentes(p),
  "ascensor-enteros": (p) => buildAscensorEnteros(p),
  "recta-enteros": () => buildRectaEnteros(),
  "valor-absoluto": (p) => buildValorAbsoluto(p),
  "comparar-enteros": (p) => buildCompararEnteros(p),
  "suma-recta": (p) => buildSumaRecta(p),
  "fichas-opuestos": (p) => buildFichasOpuestos(p),
  "resta-opuesto": (p) => buildRestaOpuesto(p),
  "parentesis-signos": (p) => buildParentesisSignos(p),
  "producto-signos": (p) => buildProductoSignos(p),
  "division-inversa": (p) => buildDivisionInversa(p),
  "decimal-zoom": (p) => buildDecimalZoom(p),
  "tabla-decimal": (p) => buildTablaDecimal(p),
  "comparar-decimales": (p) => buildCompararDecimales(p),
  "redondeo-decimal": (p) => buildRedondeoDecimal(p),
  "decimal-columna": (p) => buildDecimalColumna(p),
  "decimal-producto": (p) => buildDecimalProducto(p),
  "coma-potencias10": (p) => buildComaPotencias10(p),
  "division-decimal": (p) => buildDivisionDecimal(p),
  "division-coma-divisor": (p) => buildDivisionComaDivisor(p),
  "medir-unidad": () => buildMedirUnidad(),
  "meridiano-metro": () => buildMeridianoMetro(),
  "cubo-agua": () => buildCuboAgua(),
  "escalera-unidades": (p) => buildEscaleraUnidades(p),
  "tabla-unidades": (p) => buildTablaUnidades(p),
  "escala-longitudes": () => buildEscalaLongitudes(),
  "cuadrados-area": (p) => buildCuadradosArea(p),
  "m2-dm2": () => buildM2Dm2(),
  "tabla-razon": (p) => buildTablaRazon(p),
  "reduccion-unidad": (p) => buildReduccionUnidad(p),
  "regla-tres-cruz": (p) => buildReglaTresCruz(p),
  "porcentaje-mental": (p) => buildPorcentajeMental(p),
  "factor-cambio": (p) => buildFactorCambio(p),
  "regla-tres-producto": (p) => buildReglaTresProducto(p),
  "cuadricula-porcentaje": (p) => buildCuadriculaPorcentaje(p),
  "aumento-barra": (p) => buildAumentoBarra(p),
  "fraccion-partes": (p) => buildFraccionPartes(p),
  "fraccion-recta": (p) => buildFraccionRecta(p),
  "fraccion-operador": (p) => buildFraccionOperador(p),
  "fraccion-equivalente": (p) => buildFraccionEquivalente(p),
  "fraccion-barras-suma": (p) => buildFraccionBarrasSuma(p),
  "fraccion-de-fraccion": (p) => buildFraccionDeFraccion(p),
  "simplificar-factores": (p) => buildSimplificarFactores(p),
  "simplificar-irreducible": (p) => buildSimplificarIrreducible(p),
  "fraccion-cabe": (p) => buildFraccionCabe(p),
  "fraccion-combinada": (p) => buildFraccionCombinada(p),
  "fraccion-gasto-resto": (p) => buildFraccionGastoResto(p),
  "balanza-ecuacion": (p) => buildBalanzaEcuacion(p),
  "maquina-funcion": (p) => buildMaquinaFuncion(p),
  "semejantes-agrupar": (p) => buildSemejantesAgrupar(p),
  "letras-valores": () => buildLetrasValores(),
  "enunciado-expresion": () => buildEnunciadoExpresion(),
  "campo-perimetro-area": () => buildCampoPerimetroArea(),
  "monomio-partes": () => buildMonomioPartes(),
  "monomio-producto": (p) => buildMonomioProducto(p),
  "monomio-cociente": (p) => buildMonomioCociente(p),
  "ecuacion-identidad": () => buildEcuacionIdentidad(),
  "comprobar-solucion": () => buildComprobarSolucion(),
  "pasos-problema": () => buildPasosProblema(),
  "recta-semirrecta": () => buildRectaSemirrecta(),
  "posiciones-rectas": () => buildPosicionesRectas(),
  "mediatriz-equidistan": () => buildMediatrizEquidistan(),
  "mediatriz-compas": () => buildMediatrizCompas(),
  "bisectriz-equidistan": () => buildBisectrizEquidistan(),
  "bisectriz-compas": () => buildBisectrizCompas(),
  "angulo-elementos": () => buildAnguloElementos(),
  "angulos-opuestos": () => buildAngulosOpuestos(),
  "paralelas-secante": () => buildParalelasSecante(),
  "grado-minuto": () => buildGradoMinuto(),
  "angulos-columna": (p) => buildAngulosColumna(p),
  "triangulo-180": () => buildTriangulo180(),
  "poligono-triangulos": () => buildPoligonoTriangulos(),
  "triangulos-clasificacion": () => buildTriangulosClasificacion(),
  "triangulo-mediana": () => buildTrianguloMediana(),
  "triangulo-altura": () => buildTrianguloAltura(),
  "cuadrilateros-familia": () => buildCuadrilaterosFamilia(),
  "trapecio-tipos": () => buildTrapecioTipos(),
  "poligono-regular-circunscrito": () => buildPoligonoRegularCircunscrito(),
  "poligono-apotema": () => buildPoligonoApotema(),
  "circunferencia-elementos": () => buildCircunferenciaElementos(),
  "circunferencia-recta": () => buildCircunferenciaRecta(),
  "circunferencias-posiciones": () => buildCircunferenciasPosiciones(),
  "revolucion-giro": () => buildRevolucionGiro(),
  "poliedro-elementos": () => buildPoliedroElementos(),
  "poliedros-regulares": () => buildPoliedrosRegulares(),
  "prisma-elementos": () => buildPrismaElementos(),
  "piramide-elementos": () => buildPiramideElementos(),
  "area-perimetro": () => buildAreaPerimetro(),
  "area-rectangulo": (p) => buildAreaRectangulo(p),
  "area-paralelogramo": () => buildAreaParalelogramo(),
  "area-rombo": () => buildAreaRombo(),
  "area-trapecio": () => buildAreaTrapecio(),
  "area-triangulo": () => buildAreaTriangulo(),
  "area-triangulo-rectangulo": () => buildAreaTrianguloRectangulo(),
  "area-poligono-triangulos": () => buildAreaPoligonoTriangulos(),
  "area-poligono-regular": () => buildAreaPoligonoRegular(),
  "longitud-pi": () => buildLongitudPi(),
  "area-circulo": () => buildAreaCirculo(),
  "corona-circular": () => buildCoronaCircular(),
  "plano-cartesiano": () => buildPlanoCartesiano(),
  "cuadrantes-signos": () => buildCuadrantesSignos(),
  "diagrama-puntos": () => buildDiagramaPuntos(),
  "grafica-tramos": () => buildGraficaTramos(),
  "grafica-llamadas": () => buildGraficaLlamadas(),
  "tabla-frecuencias": () => buildTablaFrecuencias(),
  "media-mediana-moda": () => buildMediaMedianaModa(),
  "mediana-par": () => buildMedianaPar(),
  "grafico-barras-histograma": () => buildGraficoBarrasHistograma(),
  "diagrama-sectores": () => buildDiagramaSectores(),
  "exp-determinista-aleatorio": () => buildExpDeterministaAleatorio(),
  "espacio-muestral": () => buildEspacioMuestral(),
  "sucesos-conjuntos": () => buildSucesosConjuntos(),
  "frecuencias-dado": () => buildFrecuenciasDado(),
  "grandes-numeros": () => buildGrandesNumeros(),
  "laplace-dado": () => buildLaplaceDado(),
  "suceso-union-interseccion": () => buildSucesoUnionInterseccion(),
  "pitagoras-cuadrados": (p) => buildPitagorasCuadrados(p),
  "semejanza-figuras": (p) => buildSemejanzaFiguras(p),
  "tales-sombras": (p) => buildTalesSombras(p),
  "desarrollo-ortoedro": (p) => buildDesarrolloOrtoedro(p),
  "desarrollo-cilindro": (p) => buildDesarrolloCilindro(p),
  "desarrollo-cono": (p) => buildDesarrolloCono(p),
  "esfera-cilindro": () => buildEsferaCilindro(),
  "cubo-dm3": () => buildCuboDm3(),
  "arquimedes-volumenes": () => buildArquimedesVolumenes(),
  "funcion-temperatura": () => buildFuncionTemperatura(),
  "funcion-tramos-extremos": () => buildFuncionTramosExtremos(),
  "funcion-es-no-es": () => buildFuncionEsNoEs(),
  "recta-pendiente": (p) => buildRectaPendiente(p),
  "dispersion-puntos": () => buildDispersionPuntos(),
  "caja-bigotes": () => buildCajaBigotes(),
  "error-aproximacion": (p) => buildErrorAproximacion(p),
  "notacion-cientifica": (p) => buildNotacionCientifica(p),
  "progresion-pasos": (p) => buildProgresionPasos(p),
  "suma-gauss": (p) => buildSumaGauss(p),
  "fracciones-orden": () => buildFraccionesOrden(),
  "fraccion-total": (p) => buildFraccionTotal(p),
  "cantidad-inicial": (p) => buildCantidadInicial(p),
  "pitagoras-demostracion": (p) => buildPitagorasDemostracion(p),
  "coordenadas-geograficas": () => buildCoordenadasGeograficas(),
  "cuadrado-diferencia": (p) => buildCuadradoDiferencia(p),
  "polinomio-tabla": () => buildPolinomioTabla(),
  "factor-comun-area": (p) => buildFactorComunArea(p),
  "recta-tabla-puntos": (p) => buildRectaTablaPuntos(p),
  "recta-constante": (p) => buildRectaConstante(p),
  "dominio-recorrido": () => buildDominioRecorrido(),
  "tabla-formula": (p) => buildTablaFormula(p),
  "tarifas-escalones": (p) => buildTarifasEscalones(p),
  "sustitucion-sistema": () => buildSustitucionSistema(),
  "sistema-test": () => buildSistemaTest(),
  "progresion-comparar": (p) => buildProgresionComparar(p),
  "potencias-factores": (p) => buildPotenciasFactores(p),
  "potencias-exp-negativo": (p) => buildPotenciasExpNegativo(p),
  "potencia-signo": (p) => buildPotenciaSigno(p),
  "potencia-de-potencia": (p) => buildPotenciaDePotencia(p),
  "potencia-de-producto": (p) => buildPotenciaDeProducto(p),
  "potencia-fraccion-inversa": (p) => buildPotenciaFraccionInversa(p),
  "fraccion-mixta": (p) => buildFraccionMixta(p),
  "racionales-zoom": () => buildRacionalesZoom(),
  "decimal-periodico-restos": (p) => buildDecimalPeriodicoRestos(p),
  "generatriz-periodico": (p) => buildGeneratrizPeriodico(p),
  "error-relativo-comparar": (p) => buildErrorRelativoComparar(p),
  "notacion-operacion": (p) => buildNotacionOperacion(p),
  "aproximacion-raiz": (p) => buildAproximacionRaiz(p),
  "numero-oro-construccion": () => buildNumeroOroConstruccion(),
  "pi-circunferencia": () => buildPiCircunferencia(),
  "conjuntos-numericos": () => buildConjuntosNumericos(),
  "raiz-en-recta": (p) => buildRaizEnRecta(p),
  "radical-potencia": (p) => buildRadicalPotencia(p),
  "radical-extraer": (p) => buildRadicalExtraer(p),
  "radicales-semejantes": () => buildRadicalesSemejantes(),
  "racionalizar": (p) => buildRacionalizar(p),
  "proporcion-compuesta": (p) => buildProporcionCompuesta(p),
  "reparto-partes": (p) => buildRepartoPartes(p),
  "mezcla-tabla": (p) => buildMezclaTabla(p),
  "movil-encuentro": (p) => buildMovilEncuentro(p),
  "interes-proporcional": (p) => buildInteresProporcional(p),
  "polinomios-columna": (p) => buildPolinomiosColumna(p),
  "producto-area": (p) => buildProductoArea(p),
  "denominadores-mcm": (p) => buildDenominadoresMcm(p),
  "problema-barras": (p) => buildProblemaBarras(p),
  "inecuacion-signo": (p) => buildInecuacionSigno(p),
  "reduccion-suma": (p) => buildReduccionSuma(p),
  "punto-pendiente": (p) => buildPuntoPendiente(p),
  "parabola-vertice": (p) => buildParabolaVertice(p),
  "arbol-urna": (p) => buildArbolUrna(p),
  "varianza-desviaciones": (p) => buildVarianzaDesviaciones(p),
  "caja-atipico": () => buildCajaAtipico(),
  "vector-coordenadas": (p) => buildVectorCoordenadas(p),
  "suma-vectores": (p) => buildSumaVectores(p),
  "punto-medio-distancia": (p) => buildPuntoMedioDistancia(p),
  "perpendicular-giro": (p) => buildPerpendicularGiro(p),
  "homotecia-proyeccion": (p) => buildHomoteciaProyeccion(p),
  "tales-paralelas": (p) => buildTalesParalelas(p),
  "tronco-semejanza": (p) => buildTroncoSemejanza(p),
  "hiperbola-asintotas": (p) => buildHiperbolaAsintotas(p),
  "funcion-trozos": () => buildFuncionTrozos(),



  "raiz-cuadrado": (p) => buildRaizCuadrado(p),
  "raiz-entre-cuadrados": (p) => buildRaizEntreCuadrados(p),
  "cuadrado-suma": (p) => buildCuadradoSuma(p),
  "suma-por-diferencia": (p) => buildSumaPorDiferencia(p),
  "parabola-raices": (p) => buildParabolaRaices(p),
  "sistema-rectas": (p) => buildSistemaRectas(p),
  "funcion-continuidad": () => buildFuncionContinuidad(),
  "funcion-tendencia-periodo": () => buildFuncionTendenciaPeriodo(),
  "pendiente-dos-puntos": (p) => buildPendienteDosPuntos(p),
  "rectas-encuentro": () => buildRectasEncuentro(),
  "conica-lugar": (p) => buildConicaLugar(p),
  "sector-circular": (p) => buildSectorCircular(p),
  "husos-horarios": () => buildHusosHorarios(),
  "red-solucion-solida": () => buildRedSolucionSolida(),
  "curva-enfriamiento": () => buildCurvaEnfriamiento(),
  "solidificacion-etapas": () => buildSolidificacionEtapas(),
  "regla-palanca": () => buildReglaPalanca(),
  "eutectico-enfriamiento": () => buildEutecticoEnfriamiento(),
  "fec-enfriamiento": (p) => buildFeCEnfriamiento(p),
  "grafito-fundiciones": () => buildGrafitoFundiciones(),
  "vidrio-red": () => buildVidrioRed(),
  "prensado-sinterizado": () => buildPrensadoSinterizado(),
  "barbotina": () => buildBarbotina(),
  "polimerizacion-adicion": () => buildPolimerizacionAdicion(),
  "polimerizacion-condensacion": () => buildPolimerizacionCondensacion(),
  "polimeros-calor": () => buildPolimerosCalor(),
  "extrusion-tornillo": () => buildExtrusionTornillo(),
  "deposito-seguridad": () => buildDepositoSeguridad(),
  "austenita-martensita": () => buildAustenitaMartensita(),
  "jominy-ensayo": () => buildJominyEnsayo(),
  "ttt-lectura": () => buildTttLectura(),
  "ciclos-tratamiento": () => buildCiclosTratamiento(),
  "cementacion-difusion": () => buildCementacionDifusion(),
  "pila-corrosion": () => buildPilaCorrosion(),
  "aireacion-diferencial": () => buildAireacionDiferencial(),
  "proteccion-catodica": () => buildProteccionCatodica(),
  "desgaste-asperezas": () => buildDesgasteAsperezas(),
  "cavitacion": () => buildCavitacion(),
  "plano-inclinado": () => buildPlanoInclinado(),
  "trabajo-area-curva": () => buildTrabajoAreaCurva(),
  "resorte-trabajo": () => buildResorteTrabajo(),
  "rodadura-carrera": () => buildRodaduraCarrera(),
  "primer-principio-flujos": () => buildPrimerPrincipio(),
  "par-trabajo": () => buildParTrabajo(),
  "piston-trabajo": () => buildPistonTrabajo(),
  "presa-turbina": () => buildPresaTurbina(),
  "atomo-isotopos": () => buildAtomoIsotopos(),
  "enlace-curva-energia": () => buildEnlaceCurvaEnergia(),
  "ion-nacl": () => buildIonNaCl(),
  "covalente-multiple": () => buildCovalenteMultiple(),
  "hibridacion-sp3": () => buildHibridacionSp3(),
  "metalico-nube": () => buildMetalicoNube(),
  "agua-puente-h": () => buildAguaPuenteH(),
  "cristal-amorfo": () => buildCristalAmorfo(),
  "elastico-plastico": () => buildElasticoPlastico(),
  "varilla-traccion": () => buildVarillaTraccion(),
  "diagrama-traccion": () => buildDiagramaTraccion(),
  "brinell-huella": () => buildBrinellHuella(),
  "rockwell-profundidad": () => buildRockwellProfundidad(),
  "pendulo-charpy": () => buildPenduloCharpy(),
  "fatiga-ciclos": () => buildFatigaCiclos(),
  "procesos-camino-pv": () => buildProcesosCamino(),
  "motor-frigorifica-focos": () => buildMotorFrigorificaFocos(),
  "carnot-ciclo": () => buildCarnotCiclo(),
  "carnot-frigorifico": () => buildCarnotFrigorifico(),
  "rankine-circuito": () => buildRankineCircuito(),
  "brayton-circuito": () => buildBraytonCircuito(),
  "motor-4-tiempos": () => buildMotor4Tiempos(),
  "otto-diesel-pv": () => buildOttoDieselPV(),
  "turbocompresor-flujo": () => buildTurbocompresorFlujo(),
  "frigorifico-circuito": () => buildFrigorificoCircuito(),
  "bomba-calor-inversion": () => buildBombaCalorInversion(),
  "oersted-aguja": () => buildOersted(),
  "hilos-paralelos-fuerza": () => buildHilosParalelos(),
  "lorentz-carga": () => buildLorentzCarga(),
  "espira-momento": () => buildEspiraMomento(),
  "faraday-varilla": () => buildFaradayVarilla(),
  "motor-cc-bloques": () => buildMotorCcBloques(),
  "campo-giratorio": () => buildCampoGiratorio(),
  "arranque-estrella-triangulo": () => buildEstrellaTriangulo(),
  "monofasico-arranque": () => buildMonofasicoArranque(),
  "humedad-compresion": () => buildHumedadCompresion(),
  "compresor-embolo": () => buildCompresorEmbolo(),
  "red-distribucion-aire": () => buildRedDistribucion(),
  "cilindros-efecto": () => buildCilindrosEfecto(),
  "valvula-32-conmutacion": () => buildValvula32(),
  "estrangulacion-velocidad": () => buildEstrangulacion(),
  "espacio-fase-secuencia": () => buildEspacioFase(),
  "mando-doble-efecto": () => buildMandoDoble(),
  "viscosidad-placas": () => buildViscosidadPlacas(),
  "flujo-laminar-turbulento": () => buildFlujoLaminarTurbulento(),
  "prensa-hidraulica": () => buildPrensaHidraulica(),
  "continuidad-bernoulli": () => buildContinuidadBernoulli(),
  "bomba-engranajes": () => buildBombaEngranajes(),
  "limitadora-descarga": () => buildLimitadoraDescarga(),
  "valvula-43-cilindro": () => buildValvula43Cilindro(),
  "regulacion-caudal-hid": () => buildRegulacionCaudalHid(),
  "lazo-abierto-cerrado": () => buildLazoAbiertoCerrado(),
  "respuesta-escalon": () => buildRespuestaEscalon(),
  "polos-plano-s": () => buildPolosPlanoS(),
  "reduccion-bloques": () => buildReduccionBloques(),
  "offset-proporcional": () => buildOffsetProporcional(),
  "laplace-dominios": () => buildLaplaceDominios(),
  "senal-analogica-digital": () => buildSenalAnalogicaDigital(),
  "puertas-logicas-basicas": () => buildPuertasLogicasBasicas(),
  "karnaugh-agrupar": () => buildKarnaughAgrupar(),
  "biestable-rs": () => buildBiestableRs(),
  "sensor-inductivo": () => buildSensorInductivo(),
  "optica-sensor": () => buildOpticaSensor(),
  "galga-deformacion": () => buildGalgaDeformacion(),
  "encoder-tacometro": () => buildEncoderTacometro(),
  "presion-manometros": () => buildPresionManometros(),
  "temperatura-captadores": () => buildTemperaturaCaptadores(),
  "operacional-inversor": () => buildOperacionalInversor(),
  "acelerador-asr": () => buildAceleradorAsr(),
  "conversion-bases": () => buildConversionBases(),
  "logica-niveles": () => buildLogicaNiveles(),
  "puertas-universales": () => buildPuertasUniversales(),
  "nand-implementacion": () => buildNandImplementacion(),
  "mux-decoder": () => buildMuxDecoder(),
  "sumador-binario": () => buildSumadorBinario(),
  "secuencial-intro": () => buildSecuencialIntro(),
  "registro-desplazamiento": () => buildRegistroDesplazamiento(),
  "biestable-jk-d-t": () => buildBiestableJkDT(),
  "cableado-ladder": () => buildCableadoLadder(),
  "grafo-bimodal": () => buildGrafoBimodal(),
  "temporizadores-cronograma": () => buildTemporizadoresCronograma(),
  "estrella-triangulo-control": () => buildEstrellaTrianguloControl(),
  "intervalo-recta": (p) => buildIntervaloRecta(p),
  "semirrecta-recta": (p) => buildSemirrectaRecta(p),
  "division-polinomios": (p) => buildDivisionPolinomios(p),
  "ruffini-tabla": (p) => buildRuffiniTabla(p),
  "trig-triangulo-razones": (p) => buildTrigTrianguloRazones(p),
  "trig-semejantes": () => buildTrigSemejantes(),
  "trig-notables": (p) => buildTrigNotables(p),
  "trig-altura-arbol": (p) => buildTrigAlturaArbol(p),
  "arbol-conteo": (p) => buildArbolConteo(p),
  "permutaciones-arbol": () => buildPermutacionesArbol(),
  "combinaciones-dividir": () => buildCombinacionesDividir(),
  "complejo-suma-vectores": (p) => buildComplejoSumaVectores(p),
  "complejo-giro-i": (p) => buildComplejoGiroI(p),
  "complejo-polar": (p) => buildComplejoPolar(p),
  "complejo-producto-polar": (p) => buildComplejoProductoPolar(p),
  "complejo-raices": (p) => buildComplejoRaices(p),
  "logaritmo-exponente": (p) => buildLogaritmoExponente(p),
  "logaritmo-producto": (p) => buildLogaritmoProducto(p),
  "gauss-eliminacion": (p) => buildGaussEliminacion(p),
  "serie-geometrica-saltos": (p) => buildSerieGeometricaSaltos(p),
  "radian-arco": (p) => buildRadianArco(p),
  "circulo-goniometrico": (p) => buildCirculoGoniometrico(p),
  "proyeccion-vector": (p) => buildProyeccionVector(p),
  "limite-aproximacion": () => buildLimiteAproximacion(),
  "asintotas-tipos": (p) => buildAsintotasTipos(p),
  "secante-tangente": () => buildSecanteTangente(),
  "derivada-signo": () => buildDerivadaSigno(),
  "extremos-criterios": () => buildExtremosCriterios(),
  "bayes-frecuencias": () => buildBayesFrecuencias(),
  "estadistica-conceptos": () => buildEstadisticaConceptos(),
  "interes-compuesto-barras": (p) => buildInteresCompuestoBarras(p),
  "anualidad-capitalizacion": (p) => buildAnualidadCapitalizacion(p),
  "anualidad-amortizacion": (p) => buildAnualidadAmortizacion(p),
  "triangulo-pascal": () => buildTrianguloPascal(),
  "cuantia-monedas": () => buildCuantiaMonedas(),
  "esperanza-juego": () => buildEsperanzaJuego(),
  "binomial-forma": () => buildBinomialForma(),
  "campana-normal": () => buildCampanaNormal(),
  "tipificacion-normal": () => buildTipificacionNormal(),
  "intervalo-confianza-construccion": () => buildIntervaloConfianza(),
  "matriz-producto": () => buildMatrizProducto(),
  "matriz-gauss-jordan": (p) => buildMatrizGaussJordan(p),
  "matriz-rango-gauss": (p) => buildMatrizRangoGauss(p),
  "matriz-traspuesta": () => buildMatrizTraspuesta(),
  "grafo-adyacencia": () => buildGrafoAdyacencia(),
  "matriz-elementos": () => buildMatrizElementos(),
  "matriz-tipos": () => buildMatrizTipos(),
  "determinante-sarrus": (p) => buildDeterminanteSarrus(p),
  "matriz-menor-adjunto": (p) => buildMatrizMenorAdjunto(p),
  "determinante-adjuntos": (p) => buildDeterminanteAdjuntos(p),
  "determinante-gauss": (p) => buildDeterminanteGauss(p),
  "sistema-forma-matricial": () => buildSistemaFormaMatricial(),
  "sistema-gauss-ampliada": (p) => buildSistemaGaussAmpliada(p),
  "rouche-casos": () => buildRoucheCasos(),
  "vector-componentes-3d": (p) => buildVectorComponentes3d(p),
  "vectores-suma-3d": (p) => buildVectoresSuma3d(p),
  "producto-escalar-proyeccion": (p) => buildProductoEscalarProyeccion(p),
  "producto-vectorial-3d": (p) => buildProductoVectorial3d(p),
  "paralelepipedo-volumen": (p) => buildParalelepipedoVolumen(p),
  "recta-espacio-3d": (p) => buildRectaEspacio3d(p),
  "plano-tres-puntos-3d": (p) => buildPlanoTresPuntos3d(p),
  "rectas-posiciones-3d": () => buildRectasPosiciones3d(),
  "proyeccion-punto-plano-3d": (p) => buildProyeccionPuntoPlano3d(p),
  "distancia-punto-recta-3d": (p) => buildDistanciaPuntoRecta3d(p),
  "distancia-rectas-cruzan-3d": (p) => buildDistanciaRectasCruzan3d(p),
  "bolzano-biseccion": () => buildBolzanoBiseccion(),
  "rolle-lagrange": (p) => buildRolleLagrange(p),
  "primitiva-familia": () => buildPrimitivaFamilia(),
  "riemann-sumas": () => buildRiemannSumas(),
  "teorema-fundamental": () => buildTeoremaFundamental(),
  "area-entre-curvas": () => buildAreaEntreCurvas(),
  "solido-revolucion": () => buildSolidoRevolucion(),
  "pascal-binomio": () => buildPascalBinomio(),
  "semiplano-prueba": () => buildSemiplanoPrueba(),
  "rectas-nivel": () => buildRectasNivel(),
  "poblacion-muestra": () => buildPoblacionMuestra(),
  "tipos-muestreo": () => buildTiposMuestreo(),
  "tcl-medias": () => buildTclMedias(),
  "contraste-region": () => buildContrasteRegion(),
  "proceso-diseno-ciclo": () => buildProcesoDisenoCiclo(),
  "gantt-camino-critico": () => buildGanttCaminoCritico(),
  "escala-material-zoom": () => buildEscalaMaterialZoom(),
  "polimero-cadenas": () => buildPolimeroCadenas(),
  "conformado-procesos": () => buildConformadoProcesos(),
  "transmision-flujo": () => buildTransmisionFlujo(),
  "correa-abierta-cruzada": () => buildCorreaAbiertaCruzada(),
  "engranajes-giro": () => buildEngranajesGiro(),
  "biela-manivela-ciclo": () => buildBielaManivelaCiclo(),
  "palanca-generos": () => buildPalancaGeneros(),
  "carga-movil-circuito": () => buildCargaMovilCircuito(),
  "serie-paralelo-reparto": () => buildSerieParaleloReparto(),
  "kirchhoff-nodo-malla": () => buildKirchhoffNodoMalla(),
  "ciclo-instruccion": () => buildCicloInstruccion(),
  "bucle-iteraciones": () => buildBucleIteraciones(),
  "sistema-control-termostato": () => buildSistemaControlTermostato(),
  "sensor-divisor-tension": () => buildSensorDivisorTension(),
  "histeresis-comparador": () => buildHisteresisComparador(),
  "secuencia-clasificacion": () => buildSecuenciaClasificacion(),
  "triple-sostenibilidad": () => buildTripleSostenibilidad(),
  "ciclo-vida-fases": () => buildCicloVidaFases(),
  "economia-lineal-circular": () => buildEconomiaLinealCircular(),
  "fases-proyecto-eso": () => buildFasesProyectoEso(),
  "ciencia-tecnica-tecnologia": () => buildCienciaTecnicaTecnologia(),
  "trazo-paralela-escuadra": () => buildTrazoParalelaEscuadra(),
  "acotar-pieza-pasos": () => buildAcotarPiezaPasos(),
  "vistas-proyeccion": () => buildVistasProyeccion(),
  "caballera-pasos": () => buildCaballeraPasos(),
  "isometrica-pasos": () => buildIsometricaPasos(),
  "boceto-croquis-plano": () => buildBocetoCroquisPlano(),
  "escala-reduccion": () => buildEscalaReduccion(),
  "materias-primas-proceso": () => buildMateriasPrimasProceso(),
  "contrachapado-capas": () => buildContrachapadoCapas(),
  "aleacion-mezcla": () => buildAleacionMezcla(),
  "ciclo-reciclaje-material": () => buildCicloReciclaje(),
  "esfuerzos-tipos": () => buildEsfuerzosTipos(),
  "triangulo-rigido": () => buildTrianguloRigido(),
  "arco-descarga": () => buildArcoDescarga(),
  "camino-cargas": () => buildCaminoCargas(),
  "movimientos-tipos": () => buildMovimientosTipos(),
  "palanca-ley": () => buildPalancaLey(),
  "polea-fija-movil": () => buildPoleaFijaMovil(),
  "electrones-corriente": () => buildElectronesCorriente(),
  "circuito-componentes": () => buildCircuitoComponentes(),
  "serie-paralelo-camino": () => buildSerieParaleloCamino(),
  "cortocircuito-fusible": () => buildCortocircuitoFusible(),
  "algoritmo-receta": () => buildAlgoritmoReceta(),
  "diagrama-flujo-simbolos": () => buildDiagramaFlujoSimbolos(),
  "bucle-repeticion-simple": () => buildBucleRepeticionSimple(),
  "variable-caja": () => buildVariableCaja(),
  "ciclo-vida-producto-eso": () => buildCicloVidaProductoEso(),
  "jerarquia-residuos": () => buildJerarquiaResiduos(),
  "capas-entorno-digital": () => buildCapasEntornoDigital(),
  "paquetes-red": () => buildPaquetesRed(),
  "extrusion-perfil": () => buildExtrusionPerfil(),
  "eso2-ohm-agua": () => buildOhmAgua(),
  "eso2-mixto-reduccion": () => buildMixtoReduccion(),
  "eso2-biela-manivela": () => buildBielaManivela(),
  "eso2-bucle-traza": () => buildBucleTraza(),
  "eso2-vistas-europeo": () => buildVistasEuropeo(),
  "eso2-curva-traccion": () => buildCurvaTraccion(),
  "eso2-ciclo-diseno": () => buildCicloDiseno(),
  "eso2-sincronizacion-nube": () => buildSincronizacionNube(),
  "eso3-diodo-sentido": () => buildDiodoSentido(),
  "eso3-transistor-llave": () => buildTransistorLlave(),
  "eso3-lazo-abierto-cerrado": () => buildLazoCerradoEso3(),
  "eso3-setup-loop": () => buildSetupLoop(),
  "eso3-pwm-ciclo": () => buildPwmCiclo(),
  /* industrial-end */
};

export function buildSlideAnim(
  scene: SlideAnimId,
  params: SlideAnimParams = {},
  captionOverride?: string[],
): AnimBuild {
  const built = SLIDE_ANIM_REGISTRY[scene](params);
  if (captionOverride?.length) {
    const captions = built.captions.map((c, i) => captionOverride[i] ?? c);
    return { ...built, captions };
  }
  return built;
}
