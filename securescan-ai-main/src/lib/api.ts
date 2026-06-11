// securescan-ai-main/src/lib/api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Add this interface to match backend response
export interface CodeAnalysisResponse {
  success: boolean;
  data: {
    code_analysis: string;
    language: string;
    timestamp: string;
  };
}

export interface CodeAnalysisResult {
  success: boolean;
  data: {
    analysis: string;
    timestamp?: string;
    [key: string]: any;
  };
}

export interface IssueAnalysisResult {
  success: boolean;
  data: {
    analysis: string;
    timestamp?: string;
    [key: string]: any;
  };
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
}

export interface ScanRequest {
  issue: string;
  app_type?: string;
  tech_stack?: string;
  environment?: string;
}

/**
 * Analyze CODE for security vulnerabilities - FIXED VERSION
 */
export const analyzeSecurityIssue = async (
  code: string, 
  language: string = 'javascript'
): Promise<CodeAnalysisResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/scan/analyze-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        code: code.trim(),
        language: language
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Code analysis failed: ${response.status} - ${errorText}`);
    }
    
    const result: CodeAnalysisResponse = await response.json();
    
    // 🔧 FIX: Map code_analysis to analysis field
    return {
      success: result.success,
      data: {
        analysis: result.data.code_analysis, // Map from code_analysis to analysis
        timestamp: result.data.timestamp,
        language: result.data.language,
        // Keep original data for backward compatibility
        code_analysis: result.data.code_analysis,
        ...result.data
      }
    };
    
  } catch (error) {
    console.error('Code analysis failed:', error);
    throw error;
  }
};

/**
 * Analyze a SECURITY ISSUE (text description)
 */
export const analyzeSecurityIssueDescription = async (
  issue: string,
  app_type: string = 'Web Application',
  tech_stack: string = 'Unknown',
  environment: string = 'Production'
): Promise<IssueAnalysisResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/scan/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        issue: issue.trim(),
        app_type,
        tech_stack,
        environment
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Issue analysis failed: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Issue analysis failed:', error);
    throw error;
  }
};

/**
 * Check backend health
 */
export const checkBackendHealth = async (): Promise<HealthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/scan/health`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Backend health check failed:', error);
    throw error;
  }
};

/**
 * Test the correct endpoint
 */
export const testCodeAnalysis = async (): Promise<CodeAnalysisResult> => {
  try {
    console.log('Testing /scan/analyze-code endpoint...');
    
    const testCode = `function login(username, password) {
  // Hardcoded credentials - SECURITY RISK
  const validUsername = 'admin';
  const validPassword = 'password123';
  
  if (username === validUsername && password === validPassword) {
    console.log('Login successful');
    return true;
  }
  return false;
}`;

    const result = await analyzeSecurityIssue(testCode, 'javascript');
    console.log('✅ Code analysis successful:', result);
    return result;
  } catch (error) {
    console.error('❌ Code analysis test failed:', error);
    throw error;
  }
};

/**
 * Utility to test the connection
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const health = await checkBackendHealth();
    return health.status === 'healthy';
  } catch {
    return false;
  }
};