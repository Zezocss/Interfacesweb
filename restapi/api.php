
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include __DIR__ . '/db.php'; 


set_error_handler(function($errno, $errstr, $errfile, $errline) {
    http_response_code(500);
    echo json_encode(['message' => 'Server error', 'error' => $errstr]);
    exit();
});

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $input = json_decode(file_get_contents('php://input'), true);

    switch ($method) {
        case 'GET':
            if (isset($_GET['type']) && $_GET['type'] === 'barcosparavenda') {
                handleGetBarcosParaVenda($pdo);
            } else {
                handleGet($pdo);
            }
            break;
            case 'POST':
                if (isset($_GET['type']) && $_GET['type'] === 'adicionarbarco') {
                    handlePostBarco($pdo);
                } elseif (isset($_GET['type']) && $_GET['type'] === 'atualizarbarco') {
                    handleUpdateBarco($pdo);
                } else {
                    handlePost($pdo, $input);
                }
                break;
            
        case 'PUT':
            handlePut($pdo, $input);
            break;
        case 'DELETE':
            if (isset($_GET['type']) && $_GET['type'] === 'deletebarco') {
                handleDeleteBarcos($pdo);
            } else {
                handleDelete($pdo, $input);
            }
            break;
        default:
            echo json_encode(['message' => 'Invalid request method']);
            break;
    }
} catch (Exception $e) {
    echo json_encode(['message' => 'Erro no servidor', 'error' => $e->getMessage()]);
}

function handleGet($pdo) {
    $sql = "SELECT clientes.*, barcos.nome_mar 
    FROM clientes
    LEFT JOIN barcos ON clientes.id_cliente = barcos.id_cliente";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function handlePost($pdo, $input) {
    try {
        
        $pdo->beginTransaction();

      
        $sqlCliente = "INSERT INTO clientes (nome, email, nif, telemovel) VALUES (:nome, :email, :nif, :telemovel)";
        $stmtCliente = $pdo->prepare($sqlCliente);
        $stmtCliente->execute([
            'nome' => $input['nome'],
            'email' => $input['email'],
            'nif' => $input['nif'],
            'telemovel' => $input['telemovel'],
        ]);


        $idCliente = $pdo->lastInsertId();

   
        if (!empty($input['nome_mar'])) {
            $sqlBarco = "INSERT INTO barcos (nome_mar, id_cliente) VALUES (:nome_mar, :id_cliente)";
            $stmtBarco = $pdo->prepare($sqlBarco);
            $stmtBarco->execute([
                'nome_mar' => $input['nome_mar'],
                'id_cliente' => $idCliente,
            ]);
        }

 
        $pdo->commit();
        echo json_encode(['message' => 'Cliente e barco adicionados com sucesso']);
    } catch (Exception $e) {

        $pdo->rollBack();
        error_log("Erro no handlePost: " . $e->getMessage());
        echo json_encode(['message' => 'Erro no servidor', 'error' => $e->getMessage()]);
        http_response_code(500);
    }
}

function handlePut($pdo, $input) {
    try {
     
        $sqlCliente = "UPDATE clientes 
                       SET nome = :nome, 
                           email = :email, 
                           nif = :nif, 
                           telemovel = :telemovel 
                       WHERE id_cliente = :id";
        $stmtCliente = $pdo->prepare($sqlCliente);
        $stmtCliente->execute([
            'nome' => $input['nome'],
            'email' => $input['email'],
            'nif' => $input['nif'],
            'telemovel' => $input['telemovel'],
            'id' => $input['id'],
        ]);

     
        if (isset($input['nome_mar'])) {
            $sqlBarco = "UPDATE barcos 
                         SET nome_mar = :nome_mar 
                         WHERE id_cliente = :id";
            $stmtBarco = $pdo->prepare($sqlBarco);
            $stmtBarco->execute([
                'nome_mar' => $input['nome_mar'],
                'id' => $input['id'],
            ]);
        }

        echo json_encode(['message' => 'Cliente e barco atualizados com sucesso']);
    } catch (Exception $e) {
    
        error_log("Erro no handlePut: " . $e->getMessage());
        echo json_encode(['message' => 'Erro no servidor', 'error' => $e->getMessage()]);
        http_response_code(500);
    }
}



function handleDelete($pdo, $input) {
    try {
    
        $id = $_GET['id'];

  
        $pdo->beginTransaction();


        $sqlBarco = "DELETE FROM barcos WHERE id_cliente = :id_cliente";
        $stmtBarco = $pdo->prepare($sqlBarco);
        $stmtBarco->execute(['id_cliente' => $id]);

  
        $sqlCliente = "DELETE FROM clientes WHERE id_cliente = :id_cliente";
        $stmtCliente = $pdo->prepare($sqlCliente);
        $stmtCliente->execute(['id_cliente' => $id]);


        $pdo->commit();
        echo json_encode(['message' => 'Cliente e barcos associados apagados com sucesso']);
    } catch (Exception $e) {
      
        $pdo->rollBack();
        error_log("Erro ao apagar cliente e barcos: " . $e->getMessage());
        echo json_encode(['message' => 'Erro ao apagar cliente e barcos', 'error' => $e->getMessage()]);
        http_response_code(500);
    }
}


function handleGetBarcosParaVenda($pdo) {
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $sql = "SELECT * FROM vendas WHERE nome_barco LIKE :search";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['search' => '%' . $search . '%']);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function handlePostBarco($pdo) {
    if (isset($_FILES['imagem'])) {
        $nome = $_POST['nome'];
        $valor = $_POST['valor'];
        $imagem = $_FILES['imagem'];


        error_log("Nome: " . $nome);
        error_log("Valor: " . $valor);
        error_log("Imagem: " . print_r($imagem, true));

        $uploadDir = __DIR__ . '/../lagoazul/src/uploads/'; 
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true); 
        }
        $imagemPath = $uploadDir . basename($imagem['name']);
        if (move_uploaded_file($imagem['tmp_name'], $imagemPath)) {
 
            $sql = "INSERT INTO vendas (nome_barco, valor, imagem_url) VALUES (:nome_barco, :valor, :imagem_url)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['nome_barco' => $nome, 'valor' => $valor, 'imagem_url' => $imagemPath]);

            echo json_encode(['message' => 'Barco adicionado com sucesso']);
        } else {
            echo json_encode(['message' => 'Erro ao salvar a imagem no servidor']);
        }
    } else {
        echo json_encode(['message' => 'Erro ao fazer upload da imagem']);
    }
}

function handleDeleteBarcos($pdo) {
    $id = $_GET['id'];
    error_log("ID recebido para deletar: " . $id); 
    $sql = "DELETE FROM vendas WHERE id_venda = :id_venda";
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute(['id_venda' => $id]);
    if ($result) {
        error_log("Barco com ID $id apagado com sucesso");
        echo json_encode(['message' => 'Barco apagado com sucesso']);
    } else {
        error_log("Erro ao apagar barco com ID $id"); 
        echo json_encode(['message' => 'Erro ao apagar barco']);
    }

}
    function handleUpdateBarco($pdo) {
        try {
            $id = $_POST['id']; 
            $nome = $_POST['nome']; 
            $valor = $_POST['valor']; 
            $imagem = $_FILES['imagem'] ?? null;
    
 
            error_log("ID recebido: $id");
            error_log("Nome recebido: $nome");
            error_log("Valor recebido: $valor");
            error_log("Imagem recebida: " . print_r($imagem, true));
    
  
            $sql = "UPDATE vendas SET nome_barco = :nome, valor = :valor";
            $params = ['nome' => $nome, 'valor' => $valor];
    
     
            if ($imagem && $imagem['tmp_name']) {
                $uploadDir = __DIR__ . '/../lagoazul/src/uploads/';
                $imagemPath = $uploadDir . basename($imagem['name']);
                if (!move_uploaded_file($imagem['tmp_name'], $imagemPath)) {
                    throw new Exception("Erro ao mover o arquivo de imagem.");
                }
                $sql .= ", imagem_url = :imagem_url";
                $params['imagem_url'] = $imagemPath;
            }
    
            $sql .= " WHERE id_venda = :id";
            $params['id'] = $id;
    
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
    
            echo json_encode(['message' => 'Barco atualizado com sucesso']);
        } catch (Exception $e) {
            error_log("Erro no handleUpdateBarco: " . $e->getMessage());
            echo json_encode(['message' => 'Erro ao atualizar barco', 'error' => $e->getMessage()]);
            http_response_code(500);
        }
    
    
    
}