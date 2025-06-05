// App.js
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import AuthProvider from './src/navigation/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
