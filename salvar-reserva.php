<?php
/**
 * =============================================
 * SALVAR-RESERVA.PHP
 * =============================================
 * Salva as reservas em um arquivo JSON no servidor
 * Também envia um email de notificação
 */

// Configurações
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Se for OPTIONS (preflight), retorna 200
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Pega os dados enviados
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Valida os dados
if (!$data || !isset($data['reservas'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Dados inválidos ou vazios'
    ]);
    exit;
}

// =============================================
// 1. SALVAR EM ARQUIVO JSON
// =============================================
$file = 'reservas.json';
$all = [];

// Carrega dados existentes
if (file_exists($file)) {
    $content = file_get_contents($file);
    if ($content) {
        $all = json_decode($content, true) ?? [];
    }
}

// Atualiza com os novos dados
foreach ($data['reservas'] as $obra) {
    $all[$obra['id']] = [
        'id' => $obra['id'],
        'titulo' => $obra['titulo'],
        'reservantes' => $obra['reservantes'],
        'total_reservas' => count($obra['reservantes']),
        'tiragem' => $obra['tiragem'] ?? 0,
        'atualizado_em' => date('Y-m-d H:i:s')
    ];
}

// Salva no arquivo
$salvou = file_put_contents($file, json_encode($all, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($salvou === false) {
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao salvar o arquivo. Verifique as permissões.'
    ]);
    exit;
}

// =============================================
// 2. ENVIAR EMAIL (opcional)
// =============================================
$para = 'daniel.araujo.pri@gmail.com';
$assunto = '📋 DZ Studio - Nova Reserva Registrada';

// Monta o corpo do email
$mensagem = "📋 RELATÓRIO DE RESERVAS - DZ STUDIO\n";
$mensagem .= "📅 Data: " . date('d/m/Y H:i:s') . "\n";
$mensagem .= "📊 Total de reservas: " . $data['total_geral'] . "\n\n";

foreach ($data['reservas'] as $obra) {
    $mensagem .= "━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $mensagem .= "📖 Obra: " . $obra['titulo'] . "\n";
    $mensagem .= "📦 Tiragem: " . ($obra['tiragem'] ?? 0) . " exemplares\n";
    $mensagem .= "📋 Reservas: " . count($obra['reservantes']) . "\n\n";
    
    if (count($obra['reservantes']) > 0) {
        foreach ($obra['reservantes'] as $i => $r) {
            $mensagem .= "  " . ($i+1) . ". Nome: " . ($r['nome'] ?? 'N/A') . "\n";
            $mensagem .= "     Instagram: " . ($r['instagram'] ?? 'N/A') . "\n";
            $mensagem .= "     Email: " . ($r['email'] ?? 'N/A') . "\n\n";
        }
    } else {
        $mensagem .= "  ⚠️ Nenhuma reserva ainda\n\n";
    }
}

$mensagem .= "━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$mensagem .= "📧 Enviado por: Sistema DZ Studio\n";
$mensagem .= "🔗 Site: " . ($_SERVER['HTTP_REFERER'] ?? 'N/A') . "\n";

// Cabeçalhos do email
$headers = "From: sistema@dzstudio.com\r\n";
$headers .= "Reply-To: daniel.araujo.pri@gmail.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Tenta enviar o email
$email_enviado = mail($para, $assunto, $mensagem, $headers);

// =============================================
// 3. RESPOSTA
// =============================================
echo json_encode([
    'success' => true,
    'message' => 'Reservas salvas com sucesso!',
    'arquivo' => $file,
    'email_enviado' => $email_enviado,
    'total_reservas' => $data['total_geral'],
    'data' => $all
]);